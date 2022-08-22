import React from "react";
import Users from "./Users";

import { RiRadioButtonLine } from "react-icons/ri";
import { VscCopy } from "react-icons/vsc";
import { IoExitOutline } from "react-icons/io5";

const Sidebar = ({ clients, copyRoom, leaveRoom }) => {
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
          <p className="text-md font-bold ">Connected ( {clients.length} )</p>
          <RiRadioButtonLine className=" text-green-500" />
        </div>
        <div className="flex space-x-2">
          {clients.map((client) => {
            return <Users user={client} key={client.socketID} />;
          })}
        </div>

        {/* {!show ? (
          <BiChevronDown
            className="font-bold text-2xl hoverEffect"
            onClick={() => setShow(!show)}
          />
        ) : (
          <BiChevronUp
            className="font-bold text-2xl hoverEffect"
            onClick={() => setShow(!show)}
          />
        )} */}
      </div>
      {/* {show ? (
        <div className="flex space-x-4 mt-4">
          {clients.map((client) => {
            return <Users user={client} key={client.socketid} />;
          })}
        </div>
      ) : null} */}
    </div>
  );
};

export default Sidebar;
