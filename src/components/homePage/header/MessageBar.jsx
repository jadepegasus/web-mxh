import React from "react";
import { Link } from "react-router-dom";

const MessageBar = ({ message }) => {
  const { content, time, url, sender, unreadCount } = message;

  return (
    <div className="d-flex justify-content-between mb-3">
      <Link to={url} className="text-decoration-none">
        <div className="btn btn-light w-100">
          <div>
            <span className="ms-2">{`${sender} (${unreadCount} chưa đọc): ${content}`}</span>
          </div>
          <small className="fs-7">{time}</small>
        </div>
      </Link>
    </div>
  );
};

export default MessageBar;
