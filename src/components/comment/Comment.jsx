import React from "react";
import { host } from "../../env";
import { Link } from "react-router-dom";
import formatter from "../../unity/formatTime";

const Comment = ({ comment }) => {
  return (
    <div className="bg-white rounded-md flex justify-between p-2">
      <div className="flex items-center">
        <Link to={`/profile?id=${comment?.user?._id}`}>
            <div
            className={`avatar ${
                comment?.user?.user_activated === "on" ? "online" : "offline"
            }`}
            >
            <div className="w-9 rounded-full">
                <img
                alt="anh"
                src={
                    comment?.user?.user_picture
                    ? `${host}/api/images/${comment?.user?.user_picture}`
                    : `${host}/default_avatar.png`
                }
                />
            </div>
            </div>
        </Link>
        <div className="ms-4 flex flex-col -space-y-[0.2rem]">
          <span className="font-semibold">{comment?.user?.user_fullname}</span>
          <span>
            {comment?.comment?.text}
          </span>
          <span className="text-xs text-gray-500">
            {formatter.format(new Date(comment?.comment?.time))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
