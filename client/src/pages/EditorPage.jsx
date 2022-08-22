import React, { useEffect, useRef, useState } from "react";
import Editor from "../components/Editor";
import Sidebar from "../components/Sidebar";
import { toast } from "react-hot-toast";
import { initSocket } from "../socket";
import {
  useLocation,
  useParams,
  useNavigate,
  Navigate,
} from "react-router-dom";
import ACTIONS from "../actions";

const EditorPage = () => {
  const [clients, setClients] = useState([]);
  const socketRef = useRef(null);
  const location = useLocation();
  const reactNavigator = useNavigate();
  const { roomID } = useParams();

  function handleErrors(e) {
    toast.error("Socket connection failed, try again later.");
    reactNavigator("/");
  }

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      socketRef.current.emit(ACTIONS.JOIN, {
        roomID,
        username: location.state?.username,
      });

      // Listening for joined action
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketID }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room.`);
          }
          setClients(clients);
        }
      );

      // Listening for disconnection
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketID, username }) => {
        toast.success(`${username} left the room.`);
        setClients((prev) => {
          return prev.filter((client) => client.socketID !== socketID);
        });
      });
    };

    init();
    return () => {
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
    };
  }, []);

  async function copyRoomId() {
    try {
      await navigator.clipboard.writeText(roomID);
      console.log(roomID);
      toast.success("Room ID has been copied to your clipboard");
    } catch (err) {
      toast.error("Could not copy the Room ID");
      console.error(err);
    }
  }
  function leaveRoom() {
    reactNavigator("/");
  }

  if (!location.state) {
    <Navigate to="/" />;
  }

  return (
    <>
      {/* Left Nav */}
      <Sidebar clients={clients} copyRoom={copyRoomId} leaveRoom={leaveRoom} />
      {/* Shareable content */}
      <Editor />
    </>
  );
};

export default EditorPage;
