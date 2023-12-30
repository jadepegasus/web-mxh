
import { useState, useEffect } from "react";

import ProfileDetail from "./profileDetail"
import { host } from "../../env";

const ProfileSide = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(host + "/api/users/myinfo", { credentials: 'include' })
            .then((res) => res.json())
            .then((data) => setUser(data));
    }, []);

    return (
        <>
            <div className=" pt-4 flex justify-center  "  >
                <ProfileDetail user={user?.data}></ProfileDetail>
            </div>
        </>
    );
};
export default ProfileSide;
