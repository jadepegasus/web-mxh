import { useState } from "react";
import { host } from "../../env";
// import EditInfo from "./EditInfo";
import './profileDetail.css'
import { Link } from "react-router-dom";
const ProfileDetail = (props) => {
    const [visible] = useState(true);

    return (
        <>
            <div className="ProfileCard w-1/4">
                <div className="ProfileImages">
                    <img
                        src={
                            props.user?.user_cover
                                ? `${host}/api/images/${props.user?.user_cover}`
                                : `${host}/default_cover.png`
                        }
                        className="rounded-4 object-cover w-full h-full rounded-md"
                        alt="cover_image"
                    />
                    <img
                        alt="anh"
                        src={
                            props.user?.user_picture
                                ? `${host}/api/images/${props.user?.user_picture}`
                                : `${host}/default_avatar.png`
                        }
                    />

                </div>
                <div className="ProfileName">
                    <span>{props.user?.user_fullname}</span>
                    <span>{props.user?.user_gender}</span>
                </div>

                <div className="followStatus">
                    <hr />
                    <div>
                        <div className="follow">
                            <span>{props.user?.user_work_title}</span>
                            <span>Job</span>
                        </div>
                        <div className="vl"></div>
                        <div className="follow">
                            <span>{props.user?.user_current_city}</span>
                            <span>Current City</span>
                        </div>
                        {/* for profilepage */}

                    </div>
                    <hr />
                </div>


                <span>
                    <Link to={`/profile?id=${props.user?._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                        My Profile
                    </Link>
                </span>

            </div>
        </>
    );
};

export default ProfileDetail;
