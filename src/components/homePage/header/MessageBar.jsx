import React from "react";
import { host } from "../../../env";
import { Link } from "react-router-dom";
import formatter from "../../../unity/formatTime";

const MessageBar = ({ message }) => {
  return (
    <div className="bg-white rounded-md flex justify-between p-2 hover:bg-gray-100">
      <div className="flex items-center">
        <div
          className={`avatar ${
            message?.user?.user_activated === "on" ? "online" : "offline"
          }`}
        >
          <div className="w-9 rounded-full">
            <img
              alt="anh"
              src={
                message?.user?.user_picture
                  ? `${host}/api/images/${message?.user?.user_picture}`
                  : `${host}/default_avatar.png`
              }
            />
          </div>
        </div>
        <div className="ms-4 flex flex-col -space-y-[0.2rem]">
          <span className="font-semibold">{message?.user?.user_fullname}</span>
          <span className="text-gray-500">
            {message?.message?.text}
          </span>
          <span className="text-xs text-gray-500 ms-12">
            {formatter.format(new Date(message?.message?.timestamp))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageBar;
