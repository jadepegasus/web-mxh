import { host } from "../../env";
import { useState, useEffect } from "react";
import EditPoster from "./EditPoster";
import { Link } from "react-router-dom";
import Like from "../like/Like";
import PosterView from "../pages/PosterView";
import LikeCount from "../like/LikeCount";
import WriteComment from "../comment/WriteComment";
const options = {
  weekday: "long", // Thứ
  hour: "numeric", // Giờ
  minute: "numeric", // Phút
  day: "numeric", // Ngày
  month: "long", // Tháng
  year: "numeric", // Năm
};

const formatter = new Intl.DateTimeFormat("vi-VN", options);

const Poster = (props) => {
  const [edit, setEdit] = useState(false);
  const [poster, SetPoster] = useState(props.post);
  const [posterView, setPosterView] = useState(false);
  const [react, setReact] = useState("none");

  useEffect(() => {
    if (poster?._id) {
      fetch(host + "/api/likes", {
        credentials: "include",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_id: poster._id }),
      })
        .then((result) => result.json())
        .then((data) => {
          if (data?.data) {
            setReact(data.data?.type);
          }
        });
    }
  }, [poster._id]);
  const updateReact = (your_react) => {
    setReact(your_react);
  };

  const closePosterView = () => {
    setPosterView(false);
  };

  const closeEdit = () => {
    setEdit(false);
  };
  const updatePoster = (u_poster) => {
    SetPoster(u_poster);
  };
  const handleDeletePoster = () => {
    let confirm = window.confirm("xác nhận xóa poster?");
    if (confirm) {
      fetch(host + "/api/posts/" + poster?._id, {
        method: "DELETE",
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.status === "success") {
            window.alert("đã xóa thành công");
            props.delete(poster);
          } else {
            window.alert(data.message);
          }
        });
    }
  };

  return (
    <>
      <div className="flex justify-center mt-4">
        <div className="bg-white shadow-sm rounded-lg col-12 w-full sm:w-[562.4px]">
          <div className="d-flex relative px-4 pt-4">
            {props.readonly || (
              <details className="dropdown dropdown-end absolute end-0 top-0">
                <summary className="m-1 btn bg-white rounded-full border-none hover:bg-gray-100 w-10 h-10 min-h-0 p-0">
                  <svg
                    viewBox="0 0 20 20"
                    width="16"
                    height="16"
                    fill="currentColor"
                  >
                    <g fillRule="evenodd" transform="translate(-446 -350)">
                      <path d="M458 360a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path>
                    </g>
                  </svg>
                </summary>
                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                  <li>
                    <button onClick={() => setEdit(true)}>Sửa</button>
                  </li>
                  <li>
                    <button onClick={handleDeletePoster}>Xóa</button>
                  </li>
                </ul>
              </details>
            )}

            <div className="flex items-center justify-start">
              <Link to={`/profile?id=${props.user?._id}`}>
                <div
                  className={`avatar ${
                    props.user.user_activated === "on" ? "online" : "offline"
                  }`}
                >
                  <div className="w-10 rounded-full">
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
              </Link>
              <div className="ms-2">
                <div className="font-semibold leading-3">
                  {props.user?.user_fullname}
                </div>
                <small className="text-gray-400">
                  {formatter.format(new Date(poster?.time))}
                </small>
              </div>
            </div>
          </div>
          <div className="px-4 pb-4">{poster?.text}</div>
          <div className="flex cursor-pointer">
            {poster?.photos?.length === 0 ? (
              ""
            ) : poster?.photos?.length > 1 ? (
              <>
                <img
                  src={`${host}/api/images/${poster?.photos[0]}`}
                  alt="img-status"
                  className="w-1/2 h-96 object-cover"
                />
                <div className="w-1/2 relative">
                  {poster?.photos?.length === 2 || (
                    <>
                      <div className="absolute w-full h-full bg-[rgba(0,0,0,0.28)] top-0 left-0">
                        {" "}
                      </div>
                      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-2xl">
                        +{poster?.photos?.length - 2}
                      </span>
                    </>
                  )}
                  <img
                    src={`${host}/api/images/${poster?.photos[0]}`}
                    alt="img-status"
                    className="w-full object-cover h-96"
                  />
                </div>
              </>
            ) : (
              <img
                src={`${host}/api/images/${poster?.photos[0]}`}
                alt="img-status"
                className="w-full h-96 object-cover"
              />
            )}
          </div>

          <div className="text-blue-500 px-4">
            <LikeCount
              like={poster.likes}
              unlike={poster.unlikes}
              comment={poster.comments}
              share={poster.shares}
              post_id={poster._id}
            />
          </div>
          <div className="grid grid-cols-3 border-y-[1px] mx-4">
            <Like
              user_id={poster?.user_id}
              post_id={poster?._id}
              update={updatePoster}
              react={react}
              poster={poster}
              setReact={updateReact}
            />
            <button className="btn w-full my-1 bg-transparent border-none shadow-none hover:bg-gray-100 hover:text-blue-500 group" onClick={(e) => setPosterView(true)}>
              <span className="group-hover:animate-shaking-like 3xl:text-[30px] text-[calc(30px/6*5)]">
                <i className="fa-regular fa-comment"></i>
              </span>
              <span>Bình luận</span>
            </button>
            <button className="btn w-full my-1 bg-transparent border-none shadow-none hover:bg-gray-100 hover:text-blue-500 group">
              <span className="group-hover:animate-shaking-like 3xl:text-[30px] text-[calc(30px/6*5)]">
                <i className="fa-regular fa-share-from-square"></i>
              </span>
              <span> Chia sẻ</span>
            </button>
          </div>
          {/* <WriteComment></WriteComment> */}
        </div>
      </div>
      {edit && (
        <EditPoster
          user={props.user}
          post={poster}
          close={closeEdit}
          update={updatePoster}
        />
      )}
      {posterView && (
        <PosterView
          close={closePosterView}
          post_id={poster._id}
          update={updatePoster}
          react={react}
          setReact={updateReact}
        ></PosterView>
      )}
    </>
  );
};
export default Poster;
