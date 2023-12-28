import { useState } from "react";
import { host } from "../../env";
// import EditInfo from "./EditInfo";
import './ProfileSide.css'
import { Link } from "react-router-dom";
const ProfileDetail = (props) => {
    const [chatbox, setChatbox] = useState(false);

    return (
        <>
            {/* <div
                className="  shadow-sm bg-gradient-to-b from-blue-300 via-white to-white"
                style={{ backgroundColor: "white" }}
            >
                <div className=" ">

                    <div className="  pt-12 pb-36 grid justify-items-center">
                        <div
                            className={`avatar  w-40 h-40  lg:left-0 cursor-pointer`}
                            onClick={(e) => {
                                document.getElementById("modal_image_view").showModal();
                                document.getElementById("image_display").src = props.user
                                    ?.user_picture
                                    ? `${host}/api/images/${props.user?.user_picture}`
                                    : `${host}/default_avatar.png`;
                            }}
                        >
                            <div className="w-40 h-40 rounded-full border-4 border-white border-b-transparent">
                                <img
                                    alt="anh"
                                    src={
                                        props.user?.user_picture
                                            ? `${host}/api/images/${props.user?.user_picture}`
                                            : `${host}/default_avatar.png`
                                    }
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div> */}
            <div className="ProfileCard ">
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
