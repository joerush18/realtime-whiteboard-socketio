import { useEffect, useRef, useState } from "react";
import Editor from "../components/Editor";
import Sidebar from "../components/Sidebar";
import { toast } from "react-hot-toast";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import RoomService from "../services/RoomService";
import SocketService from "../services/SocketService";

const EditorPage = () => {
  const [clients, setClients] = useState<[] | undefined>([]);
  const location: any = useLocation();
  const reactNavigator = useNavigate();
  const { roomID } = useParams();
  const username = location?.state?.username;
  const socketRef = useRef(SocketService.socket);

  const checkHasClient = (clients: []) => {
    if (clients?.length < 1) {
      reactNavigator("/", {
        replace: true,
      });
    }
  };

  const onJoinSocket = async () => {
    await RoomService.joinRoom(
      socketRef.current as Socket,
      roomID,
      username as string
    ).catch((e) => {
      console.log(e);
    });
  };

  const newUserAdded = async () => {
    await RoomService.newUserAdded(socketRef.current as Socket)
      .then(({ clients, username: uname, socketID }) => {
        if (uname !== username) {
          toast.success(`${uname} joined.`);
        }
        checkHasClient(clients);
        setClients(clients);
      })
      .catch((e) => console.log(e));
  };

  const leaveRoom = async () => {
    reactNavigator("/");
    await RoomService.disconnect(
      socketRef.current as Socket,
      roomID,
      username as string
    ).catch((e) => console.log(e));
  };

  const onUserDisconnected = async () => {
    await RoomService.onUserDisconnected(socketRef.current as Socket)
      .then(({ clients, username, socketID }) => {
        toast.error(`${username} left.`);
        checkHasClient(clients);
        setClients(clients);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    onJoinSocket();
  }, []);

  useEffect(() => {
    console.log("render");
    newUserAdded();
    onUserDisconnected();
  }, [clients]);

  async function copyRoomId() {
    try {
      await navigator.clipboard.writeText(roomID as string);
      toast.success("Copied to your clipboard");
    } catch (err) {
      toast.error("Couldn't copy the Room ID");
      console.error(err);
    }
  }

  return (
    <div>
      {/* Left Nav */}
      <Sidebar clients={clients} copyRoom={copyRoomId} leaveRoom={leaveRoom} />
      {/* Shareable content */}
      <Editor />
    </div>
  );
};

export default EditorPage;
