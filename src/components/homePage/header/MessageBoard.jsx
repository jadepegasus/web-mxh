import React, { useEffect, useState } from "react";
import MessageBar from "./MessageBar";
import ChatBox from "../../message/ChatBox";
import { host } from "../../../env";

const MessageBoard = ({ close }) => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetch(host+"/api/messages", {credentials: 'include'})
      .then((result) => result.json())
      .then((data) => {
        if (data.status === "success") {
          setMessages(data.data);
        } else {
          window.alert(data.message);
        }
      });
  }, []);

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
  };

  return (
    <div className="position-absolute absolute z-3 p-3 shadow rounded-2" style={{ backgroundColor: "white", width: "20rem", right: "0px" }}>
      <div className="text-center fs-4">Danh sách tin nhắn</div>
      <hr />

      {messages.length > 0 ? (
        <div>
          {messages.map((message) => (
            <MessageBar
              key={message.id}
              message={message}
              onSelectMessage={() => handleSelectMessage(message)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center fs-6">Không có tin nhắn</div>
      )}

      {selectedMessage && (
        <div className="w-100 mt-3">
          <ChatBox message={selectedMessage} />
        </div>
      )}
    </div>
  );
};

export default MessageBoard;
