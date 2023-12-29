import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import UserBar from "../homePage/header/UserBar";
import { host } from "../../env";

const ChatSide = () => {

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
    return (
        <div className="">

            {friends.length > 0 ? (
                friends.map((user) => {
                    return <UserBar user={user} key={user._id}></UserBar>;
                })
            ) : (
                <div className="text-center fs-6">Bạn chưa kết bạn với ai</div>
            )}
        </div>
    );
};
export default ChatSide;
