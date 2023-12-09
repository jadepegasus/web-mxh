import { useRef, useState } from "react";
import { host } from "../../env";

const WriteComment = ({ user, user_reply }) => {
  const [comment, setComment] = useState("");
  const formElement = useRef();
  const [image, setImage] = useState();

  return (
    <div className="w-full p-4 border-t relative" onClick={(e) => e.stopPropagation()}>
      <div className="avatar absolute top-4 left-2">
        <div className="w-10 rounded-full">
          <img
            alt="anh"
            src={
              user?.user_picture
                ? `${host}/api/images/${user?.user_picture}`
                : `${host}/default_avatar.png`
            }
          />
        </div>
      </div>
      <form encType="multipart/form-data" className="grow ms-2" ref={formElement}>
        <div className="relative bg-gray-200/50 p-2 ms-8 rounded-2xl">
          <div
            className="outline-none text-md whitespace-pre mb-4 max-h-[4.5rem] overflow-auto"
            contentEditable
            onInput={(e) => setComment(e.target.innerText)}
          ></div>
          <div className="absolute top-2 pointer-events-none text-gray-500 font-thin text-md">
            {!comment ? "viết bình luận..." : ""}
          </div>
          <label className="absolute bottom-0 left-3">
            <i className="fa-solid fa-camera cursor-pointer text-gray-500"></i>
            <input
              name="image"
              className="hidden"
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => setImage(e.target.files[0])}
            ></input>
          </label>
          <div className="absolute bottom-0 right-3 cursor-pointer">
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>

        {image ? (
          <div className="flex justify-center">
            <div className="border-x-2 border-t-2 w-4/5 px-4 py-2 rounded-tl-2xl rounded-tr-2xl">
              image.name
            </div>
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};
export default WriteComment;
