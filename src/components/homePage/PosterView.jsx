import { useEffect, useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { host } from "../../env";
import Like from "../like/Like";
import LikeCount from "../like/LikeCount";
import formatter from "../../unity/formatTime";
import Comment from "../comment/Comment";
import SharePoster from "./SharePoster";

const PosterView = ({ close, post_id, update, react, setReact }) => {
  const [poster, setPoster] = useState();
  const [share, setShare] = useState(false);
  const [text, setText] = useState();
  const [comments, setComments] = useState([]);
  const dialog = useRef();
  const commentTextField = useRef();

  useEffect(() => {
    dialog.current.showModal();
    if (post_id) {
      fetch(host + "/api/posts/" + post_id, { credentials: "include" })
        .then((result) => result.json())
        .then((data) => {
          if (data.status === "success") {
            setPoster(data.data);
          }
        });
      fetch(host + "/api/comments/" + post_id, { credentials: "include" })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") setComments(data.data);
        });
    }
  }, [post_id]);
  const updatePoster = (poster) => {
    update(poster);
    setPoster(poster);
  };

  const handleSendComment = () => {
    fetch(host + "/api/comments", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        post_id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setComments([...comments, data.data]);
          commentTextField.current.innerText = "";
          setText("");
          updatePoster({ ...poster, comments: poster.comments + 1 });
        } else window.alert(data.message);
      });
  };
  const handleDeleteComment = (comment_id) => {
    if (window.confirm("Xác nhận xóa bình luận?"))
      fetch(host + "/api/comments/" + comment_id, {
        method: "DELETE",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            setComments(
              comments.filter((comment) => comment?.comment?._id !== comment_id)
            );
            updatePoster({ ...poster, comments: poster.comments - 1 });
          } else window.alert(data.message);
        });
  };

  return (
    <>
      <dialog className="modal" id="editPostModal" ref={dialog}>
        <div className="modal-box rounded-md overflow-hidden p-0 max-w-[34rem] max-h-[100vh]">
          <div className="py-4">
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-gray-200"
                onClick={close}
              >
                ✕
              </button>
            </form>
            <Link to={`/post?id=${post_id}`}>
              <h1
                className="font-bold text-2xl text-center w-full border-b pb-4 shadow-sm"
                id="exampleModalLabel"
              >
                Bài viết của {poster?.user.user_fullname}
              </h1>
            </Link>
            <div className="w-full max-h-[70vh] overflow-auto">
              <div className="my-1">
                <div className="flex items-center justify-start px-4">
                  <Link to={`/profile?id=${poster?.user._id}`}>
                    <div className="avatar mt-4">
                      <div className="w-10 rounded-full">
                        <img
                          alt="anh"
                          src={
                            poster?.user?.user_picture
                              ? `${host}/api/images/${poster?.user?.user_picture}`
                              : `${host}/default_avatar.png`
                          }
                        />
                      </div>
                    </div>
                  </Link>
                  <div className="ms-2 mt-4">
                    <div className="mb-0 font-semibold leading-3">
                      {poster?.user?.user_fullname}
                    </div>
                    <div className="text-xs mt-1 text-gray-400">
                      {poster?.time && formatter.format(new Date(poster?.time))}
                    </div>
                  </div>
                </div>
                <div className="px-4">
                  <p>{poster?.text}</p>
                </div>
                <div className="">
                  {poster?.photos?.map((picture, index) => {
                    if (poster?.photos?.length % 2 === 1 && index === 0)
                      return (
                        <span
                          className="relative inline-block w-full px-1 cursor-pointer"
                          key={index}
                          onClick={(e) => {
                            document
                              .getElementById("modal_image_view")
                              .showModal();
                            document.getElementById(
                              "image_display"
                            ).src = `${host}/api/images/${picture}`;
                          }}
                        >
                          <img
                            alt="img-post"
                            src={`${host}/api/images/${picture}`}
                            className="w-full object-cover h-80 border border-white"
                          />
                        </span>
                      );
                    else
                      return (
                        <span
                          className="relative inline-block w-1/2 px-1 cursor-pointer"
                          key={index}
                          onClick={(e) => {
                            document
                              .getElementById("modal_image_view")
                              .showModal();
                            document.getElementById(
                              "image_display"
                            ).src = `${host}/api/images/${picture}`;
                          }}
                        >
                          <img
                            alt="img-post"
                            src={`${host}/api/images/${picture}`}
                            className="w-full object-cover h-60 border border-white"
                          />
                        </span>
                      );
                  })}
                </div>
                <LikeCount
                  like={poster?.likes}
                  unlike={poster?.unlikes}
                  comment={poster?.comments}
                  share={poster?.shares}
                  post_id={poster?._id}
                />
                <div className="grid grid-cols-3 border-y mx-4">
                  <Like
                    user_id={poster?.user_id}
                    post_id={poster?._id}
                    update={updatePoster}
                    poster={poster}
                    react={react}
                    setReact={setReact}
                  />
                  <button className="btn w-full my-1 bg-transparent border-none shadow-none hover:bg-gray-100 hover:text-blue-500 group">
                    <span className="group-hover:animate-shaking-like 3xl:text-[30px] text-[calc(30px/6*5)]">
                      <i className="fa-regular fa-comment"></i>
                    </span>
                    <span>Bình luận</span>
                  </button>
                  <button
                    className="btn w-full my-1 bg-transparent border-none shadow-none hover:bg-gray-100 hover:text-blue-500 group"
                    onClick={(e) => setShare(true)}
                  >
                    <span className="group-hover:animate-shaking-like 3xl:text-[30px] text-[calc(30px/6*5)]">
                      <i className="fa-regular fa-share-from-square"></i>
                    </span>
                    <span> Chia sẻ</span>
                  </button>
                </div>
              </div>
              <div>
                {comments.map((comment) => (
                  <div className="mx-4 relative group">
                    <Comment comment={comment}></Comment>
                    <div
                      className="text-blue-500  absolute end-0 top-1/3 rounded-md hover:bg-gray-300/50 items-center p-1 hidden group-hover:flex"
                      onClick={(e) => handleDeleteComment(comment.comment._id)}
                      role="button"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* comment */}
            <div
              className="w-full p-4 border-t"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gray-200/50 p-2 ps-0 rounded-2xl relative flex-grow">
                <div
                  className="outline-none text-md whitespace-pre max-h-[4.5rem] overflow-auto max-w-[70vw] sm:max-w-md"
                  contentEditable
                  onInput={(e) => setText(e.target.innerText)}
                  ref={commentTextField}
                ></div>
                <div className="absolute top-2 left-2 pointer-events-none text-gray-500 font-thin text-md">
                  {!text ? "viết bình luận..." : ""}
                </div>
                {!text ? (
                  <div className="cursor-pointer p-3 absolute bottom-0 right-0">
                    <i className="fa-solid fa-paper-plane"></i>
                  </div>
                ) : (
                  <div
                    className="cursor-pointer p-3 absolute bottom-0 right-0 text-blue-500"
                    onClick={handleSendComment}
                  >
                    <i className="fa-solid fa-paper-plane"></i>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop" onClick={close}>
          <button>close</button>
        </form>
      </dialog>
      {share && (
        <SharePoster
          user={poster.user}
          post={poster}
          close={() => setShare(false)}
          update={updatePoster}
        ></SharePoster>
      )}
    </>
  );
};
export default PosterView;
