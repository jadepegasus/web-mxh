import React, { useEffect, useState } from "react";
import MessageBar from "./MessageBar";
import ChatBox from "../../message/ChatBox";
import { host } from "../../../env";

const MessageBoard = ({ close }) => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [chatbox, setChatbox] = useState(false);

  useEffect(() => {
    fetch(host + "/api/messages", { credentials: "include" })
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
    setChatbox(true)
  };

  return (
    <>
      <div className="p-3 shadow-md rounded-md absolute -right-24 bg-white min-w-[22rem] md:-right-8 max-h-[90vh] overflow-auto">
        <div className="text-center text-xl font-semibold">
          Danh sách tin nhắn
        </div>
        <hr></hr>
        {messages.length > 0 ? (
          messages.map((message, index) => {
            return (
              <div onClick={(e) => handleSelectMessage(message)} key={index}>
                <MessageBar message={message} />
              </div>
            );
          })
        ) : (
          <div className="text-center text-md">Không có tin nhắn</div>
        )}
      </div>
      {chatbox && <ChatBox receiver={selectedMessage.user} close={() => setChatbox(false)}></ChatBox>}
    </>
  );
};

export default MessageBoard;
