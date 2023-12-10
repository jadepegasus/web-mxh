import React, { useState, useEffect, useRef } from "react";
import { socket } from "../../socket";
import { host } from "../../env";
import formatter from "../../unity/formatTime";
import { Link } from "react-router-dom";

const ChatBox = ({ receiver, close }) => {
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [entering, setEntering] = useState(false);
  const timeoutId = useRef(0);
  const inputMessage = useRef();
  const scrollBox = useRef();
  const rcv = useRef() //receiver

  useEffect(() => {
    fetch(host + "/api/users/myinfo", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setSender(data?.data));
  }, []);

  useEffect(() => {
    fetch(host + "/api/messages/" + receiver?._id, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") setMessages(data.data);
        else window.alert(data.messages);
      });
    rcv.current=receiver
  }, [receiver]);

  const sendMessage = () => {
    socket.emit('onmessage', {sender: sender?._id, receiver: receiver?._id, text: newMessage, timestamp: new Date(Date.now())})
    socket.emit('newmessage', {receiver: receiver?._id, message: `${sender?.user_fullname} đã gửi 1 tin nhắn`})
    fetch(host + "/api/messages", {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: sender?._id,
        receiver: receiver?._id,
        text: newMessage,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setMessages((messages) => [...messages, data.data]);
          inputMessage.current.innerText = "";
          setNewMessage("");
        } else window.alert(data.message);
      });
  };
  const deleteMessage = (_id) => {
    if (window.confirm("xác nhận xóa tin nhắn"))
      fetch(host + "/api/messages/" + _id, {
        credentials: "include",
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: sender?._id,
          receiver: receiver?._id,
          text: newMessage,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            setMessages((messages) =>
              messages.filter((mes) => mes._id !== _id)
            );
          } else window.alert(data.message);
        });
  };

  useEffect(() => {
    function onEntering(message) {
      if (message.sender === rcv.current?._id) {
        setEntering(true);
        if (timeoutId.current) clearTimeout(timeoutId.current);
          timeoutId.current =setTimeout(() => {
            setEntering(false);
          }, 5000)
      }
    }
    function onMessage(message) {
      if(message.sender === rcv.current?._id) {
        setMessages(messages => [...messages, message])
      }
    }
    socket.on("entering", onEntering);
    socket.on('onmessage', onMessage)
    return () => {
      console.log("out socket");
      socket.off("entering", onEntering);
      socket.off('onmessage', onMessage)
      clearTimeout(timeoutId.current);
    };
  }, []);
  useEffect(() => {
    scrollBox.current.scrollTop = scrollBox.current.scrollHeight;
  }, [messages]);

  return (
    <div className="p-3 shadow-md rounded-md fixed right-0 bottom-4 bg-white min-w-[22rem] md:right-8 max-h-[90vh] overflow-auto max-w-xs z-50">
      <button
        className="btn btn-sm btn-circle absolute right-2 top-2 bg-gray-200"
        onClick={close}
      >
        ✕
      </button>
      <Link
        to={"/profile?id=" + receiver?._id}
        className=" flex items-center space-x-2"
      >
        <div
          className={`avatar ${
            receiver?.user_activated === "on" ? "online" : "offline"
          }`}
        >
          <div className="w-9 rounded-full">
            <img
              alt="anh"
              src={
                receiver?.user_picture
                  ? `${host}/api/images/${receiver?.user_picture}`
                  : `${host}/default_avatar.png`
              }
            />
          </div>
        </div>
        <span className="font-semibold">{receiver?.user_fullname}</span>
      </Link>
      <hr className="mt-2"></hr>
      <div className="max-h-[70vh] overflow-auto" ref={scrollBox}>
        {messages.map((message, index) =>
          message.sender === sender?._id ? (
            <div className="dropdown w-full" tabIndex={0} key={index}>
              <div className="chat chat-end" role="button">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src={
                        sender?.user_picture
                          ? `${host}/api/images/${sender?.user_picture}`
                          : `${host}/default_avatar.png`
                      }
                    />
                  </div>
                </div>
                <div className="chat-header">
                  <time className="text-xs opacity-50">
                    {formatter.format(new Date(message?.timestamp))}
                  </time>
                </div>
                <div
                  className="chat-bubble chat-bubble-primary dropdown"
                  tabIndex={0}
                >
                  {message?.text}
                </div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 top-0"
              >
                <li>
                  <button onClick={(e) => deleteMessage(message?._id)}>
                    Xóa
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="dropdown w-full" tabIndex={0} key={index}>
              <div className="chat chat-start" role="button">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src={
                        receiver?.user_picture
                          ? `${host}/api/images/${receiver?.user_picture}`
                          : `${host}/default_avatar.png`
                      }
                    />
                  </div>
                </div>
                <div className="chat-header">
                  <time className="text-xs opacity-50">
                    {formatter.format(new Date(message?.timestamp))}
                  </time>
                </div>
                <div className="chat-bubble">{message?.text}</div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 top-0"
              >
                <li>
                  <button onClick={(e) => deleteMessage(message?._id)}>
                    Xóa
                  </button>
                </li>
              </ul>
            </div>
          )
        )}
      </div>
      <div className="relative bg-gray-200/50 p-2 pe-8 rounded-2xl">
        <div
          className="outline-none text-md whitespace-pre max-h-[10vh] max-w-xs overflow-auto"
          contentEditable
          ref={inputMessage}
          onInput={(e) => {
            setNewMessage(e.target.innerText);
            socket.emit("entering", {
              sender: sender?._id,
              receiver: receiver?._id,
            });
          }}
        ></div>
        <div className="absolute top-2 pointer-events-none text-gray-500 font-thin text-md">
          {!newMessage ? "Aa" : ""}
        </div>
        <div className="absolute bottom-2 right-3 cursor-pointer">
          {!newMessage ? (
            <i className="fa-solid fa-paper-plane"></i>
          ) : (
            <i
              className="fa-solid fa-paper-plane text-blue-500"
              onClick={sendMessage}
            ></i>
          )}
        </div>
      </div>
      {entering && (
        <div className="absolute top-1/2 left-0 chat chat-start">
          <div className="chat-bubble chat-bubble-primary opacity-50">
            {receiver?.user_fullname}
          </div>
          <div className="chat-footer">đang nhập...</div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
