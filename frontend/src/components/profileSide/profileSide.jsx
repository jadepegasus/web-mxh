import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import ProfileDetail from "./profileDetail"
import { socket } from "../../socket";
import { host } from "../../env";

const ProfileSide = () => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(host + "/api/users/myinfo", { credentials: 'include' })
            .then((res) => res.json())
            .then((data) => setUser(data));
    }, []);


    useEffect(() => {
        if (user?.data) {
            fetch(host + "/api/posts/user/" + user.data._id)
                .then((res) => res.json())
                .then((data) =>
                    setPosts(
                        data?.data?.sort((a, b) => {
                            return a.time < b.time ? 1 : -1;
                        })
                    )
                );
        }
    }, [user]);

    return (
        <>
            <div className=" pt-4" >
                <ProfileDetail user={user?.data}></ProfileDetail>
            </div>
        </>
    );
};
export default ProfileSide;
