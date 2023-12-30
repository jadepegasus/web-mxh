import React, { useEffect, useState } from "react";
import ChatBox from "../message/ChatBox";
import { host } from "../../env";

const ChatSide = ({ close }) => {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [chatbox, setChatbox] = useState(false);
    const [friends, setFriends] = useState([]);
    useEffect(() => {
        fetch(host + "/api/friends/getfriends", { credentials: "include" })
            .then((result) => result.json())
            .then((data) => {
                if (data.status === "success")
                    setFriends(
                        data.data.sort((a, b) => {
                            return a.date < b.date ? 1 : -1;
                        })
                    );
            });
    }, []);
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

            <div className=" pt-4 max-lg:hidden  md:w-56 md:pl-4 overflow-x-hidden overflow-y-auto max-h-[90vh] flex flex-col fixed  right-2" >


                {messages.length > 0 ? (
                    messages.map((message, index) => {
                        return (
                            <div className="pt-1" onClick={(e) => handleSelectMessage(message)} key={index}>
                                <div className="bg-white rounded-md flex justify-between p-2 hover:bg-gray-100">
                                    <div className="flex items-center">
                                        <div
                                            className={`avatar ${message?.user?.user_activated === "on" ? "online" : "offline"
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

                                        </div>
                                    </div>
                                </div>
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

export default ChatSide;
