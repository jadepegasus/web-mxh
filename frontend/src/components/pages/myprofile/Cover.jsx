import { useState } from "react";
import { host } from "../../../env";
import ButtonFriend from "../../friend/ButtonFriend";
import ChatBox from "../../message/ChatBox";
// import EditInfo from "./EditInfo";

const Cover = (props) => {
  const [chatbox, setChatbox] = useState(false);

  return (
    <>
      <div
        className="flex justify-center shadow-sm bg-gradient-to-b from-blue-300 via-white to-white"
        style={{ backgroundColor: "white" }}
      >
        <div className="w-full max-w-[1000px]">
          <div className="relative w-full pt-[37%]">
            <div
              className="absolute top-0 start-0 end-0 bottom-0 cursor-pointer"
              onClick={(e) => {
                document.getElementById("modal_image_view").showModal();
                document.getElementById("image_display").src = props.user
                  ?.user_cover
                  ? `${host}/api/images/${props.user?.user_cover}`
                  : `${host}/default_cover.png`;
              }}
            >
              <img
                src={
                  props.user?.user_cover
                    ? `${host}/api/images/${props.user?.user_cover}`
                    : `${host}/default_cover.png`
                }
                className="rounded-4 object-cover w-full h-full rounded-md"
                alt="cover_image"
              />
            </div>
          </div>
          <div className="relative pt-12 pb-36 flex flex-col">
            <div
              className={`avatar ${props.user?.user_activated === "on" ? "online" : "offline"
                } w-40 h-40 absolute -top-16 right-1/2 translate-x-1/2 lg:left-0 cursor-pointer`}
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
            <div className="absolute w-max text-3xl font-bold right-1/2 translate-x-1/2 top-[5.5rem] lg:left-40 lg:top-0">
              <p className="mt-2 fs-2 fw-bold">{props.user?.user_fullname}</p>
            </div>
            {!props.readonly ? (
              <button
                className="shadow-sm border w-fit absolute right-1/2 translate-x-1/2 top-[8.5rem] lg:top-0 lg:right-0 lg:translate-x-0 lg:mt-1 p-2 rounded-btn bg-gray-100 hover:bg-gray-200"
                onClick={(e) =>
                  document.getElementById("editProfileModal")?.showModal()
                }
              >
                <i className="fa-solid fa-pen hover:animate-shaking-like"></i>
                <span className="ms-2 font-semibold">Sửa trang cá nhân</span>
              </button>
            ) : (
              <div className=" flex shadow-sm w-fit absolute right-1/2 translate-x-1/2 top-[8.5rem] lg:top-0 lg:right-0 lg:translate-x-0 lg:mt-1">
                <ButtonFriend
                  user_two_id={props.user_two_id}
                  user_one_id={props.user_one_id}
                ></ButtonFriend>
                <button className="btn ms-2" onClick={e => setChatbox(true)}>nhắn tin</button>
              </div>
            )}
          </div>
        </div>
      </div>
      {chatbox && (
        <ChatBox
          receiver={props.user}
          close={() => setChatbox(false)}
        ></ChatBox>
      )}
    </>
  );
};

export default Cover;
