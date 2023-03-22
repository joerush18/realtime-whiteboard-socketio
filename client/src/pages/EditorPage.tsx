import React, { useEffect, useRef, useState } from "react";
import Editor from "../components/Editor";
import Sidebar from "../components/Sidebar";
import { toast } from "react-hot-toast";
import {
  useLocation,
  useParams,
  useNavigate,
  Navigate,
} from "react-router-dom";
import ACTIONS from "../actions";

const EditorPage = () => {
  const [clients, setClients] = useState<[]  | undefined>([]);
  const location = useLocation();
  const reactNavigator = useNavigate();
  const { roomID } = useParams();

  async function copyRoomId() {
    try {
      await navigator.clipboard.writeText(roomID as string);
      console.log(roomID);
      toast.success("Room ID has been copied to your clipboard");
    } catch (err) {
      toast.error("Could not copy the Room ID");
      console.error(err);
    }
  }
  async function leaveRoom() {
    reactNavigator("/");
  }

  if (!location.state) {
    <Navigate to="/" />;
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
