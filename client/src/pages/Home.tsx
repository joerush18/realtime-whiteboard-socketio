import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import SocketService from "../services/SocketService";

const Home: React.FC = () => {
  const [roomID, setRoomID] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  function newRoomGenerate() {
    const newRoomId = uuidv4();
    toast.success("Created new room");
    setRoomID(newRoomId);
  }

  const connectSocket = async () => {
    await SocketService.connect("https://realtime-whiteboard-socketio-server.onrender.com/").catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    connectSocket();
  }, []);

  function joinRoom() {
    if (!roomID && !username) {
      toast.error("ROOMID & username required");
      return;
    }
    navigate(`/editor/${roomID}`, {
      state: {
        username,
      },
    });
  }

  return (
    <>
      <div className="px-7 py-4 shadow-md rounded-sm mx-7 my-7">
        <h1 className="text-3xl font-bold mb-2 ">
          RT COL<span className="text-primaryColor">LAB</span>
        </h1>
        <div>
          <h1 className="font-bold text-sm tracking-wider">
            Paste invitation ROOM ID
          </h1>
          <input
            type="text"
            placeholder="ROOM ID"
            className="inputStyle"
            value={roomID}
            onChange={(e) => setRoomID(e.target.value)}
          />
          <input
            type="text"
            placeholder="USERNAME"
            className="inputStyle"
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="ml-auto w-[70px]">
            <button
              className="px-5 py-2 my-4 bg-primaryColor rounded-lg text-white font-bold items-end hover:opacity-90 "
              onClick={joinRoom}
            >
              Join
            </button>
          </div>

          <p className="text-sm font-bold">
            if you don't have an invite then create
            <span
              className="hover:underline text-primaryColor ml-2 cursor-pointer hover:opacity-90"
              onClick={newRoomGenerate}
            >
              new room.
            </span>
          </p>
        </div>
      </div>
      <div className="text-sm absolute bottom-4 left-1/3">
        Made with <span className="text-primaryColor">❤ </span>by &nbsp;
        <a
          href="https://github.com/joerush18"
          className="underline text-primaryColor"
        >
          saroj
        </a>
      </div>
    </>
  );
};

export default Home;
