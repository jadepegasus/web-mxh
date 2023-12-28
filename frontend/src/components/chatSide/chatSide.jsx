import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import SearchBoard from "../homePage/header/SearchBoard";
import FriendBoard from "../homePage/header/FriendBoard";
import NotificationBoard from "../homePage/header/NotificationBoard";
import { socket } from "../../socket";
import MessageBoard from "../homePage/header/MessageBoard";
import { host } from "../../env";

const ChatSide = () => {

    return (
        <>
            <div className="flex justify-center pt-4 ">
                chatSide
            </div>
        </>
    );
};
export default ChatSide;
