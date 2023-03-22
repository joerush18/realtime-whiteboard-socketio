import React from "react";
import Avatar from "react-avatar";

const Users = ({ user }) => {
  return (
    <div className="flex flex-col items-center">
      <Avatar
        name={user.username}
        size={20}
        round="10px"
        className="font-bold"
      />
      {/* <p className="text-sm font-bold mt-2">{user.username}</p> */}
    </div>
  );
};

export default Users;
