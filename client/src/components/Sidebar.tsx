import React from "react";
import Users from "./Users";

import { RiRadioButtonLine } from "react-icons/ri";
import { VscCopy } from "react-icons/vsc";
import { IoExitOutline } from "react-icons/io5";
interface SideBarProps {
  clients? : [];
  copyRoom : ()=>Promise<void>;
  leaveRoom : ()=> Promise<void>;
}
const Sidebar : React.FC<SideBarProps> = ({ clients, copyRoom, leaveRoom }) => {
  return (
    <div className=" bg-primaryBg w-full  text-white px-4 py-2">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-2 ">
          RT COL<span className="text-primaryColor">LAB</span>
        </h1>
        <div className="flex space-x-4">
          <VscCopy
            className="text-xl font-bold mt-2 hoverEffect"
            onClick={copyRoom}
          />
          <IoExitOutline
            className="text-xl font-bold mt-2 hoverEffect"
            onClick={leaveRoom}
          />
        </div>
      </div>
      <hr className="bg-white opacity-30" />
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center space-x-2">
          <p className="text-md font-bold "> Connected ( { clients && clients.length} )</p>
          <RiRadioButtonLine className=" text-green-500" />
        </div>
        <div className="flex space-x-2">
          {clients && clients.map((client,index) => {
            return <Users user={client} key={`soecket_${index}`} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
