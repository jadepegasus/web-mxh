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
      fetch("/api/likes", {
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
      fetch("/api/posts/" + poster?._id, { method: "DELETE" })
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
      <div className="row justify-content-center mt-4">
        <div
          className="poster-component bg-light shadow-sm rounded-2 col-12"
          style={{
            width: "95%",
            maxWidth: "562.4px",
            padding: "12px 16px 0px 16px",
          }}
        >
          <div className="d-flex position-relative">
            {props.readonly || (
              <button
                className="btn btn-light position-absolute fs-5"
                style={{ top: "-10px", right: "-10px" }}
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                ...
              </button>
            )}
            <div className="dropdown">
              <ul className="dropdown-menu">
                <button
                  className="dropdown-item btn btn-light"
                  onClick={() => setEdit(true)}
                >
                  Sửa
                </button>
                <hr />
                <button
                  className="dropdown-item btn btn-light"
                  onClick={handleDeletePoster}
                >
                  Xóa
                </button>
              </ul>
            </div>
            <Link to={`/profile?id=${props.user?._id}`}>
              <div>
                <img
                  style={{ height: "40px", width: "40px" }}
                  x="0"
                  y="0"
                  height="100%"
                  width="100%"
                  className="rounded-circle"
                  alt="avatar"
                  src={
                    props.user?.user_picture
                      ? `${host}/api/images/${props.user?.user_picture}`
                      : `${host}/default_avatar.png`
                  }
                ></img>
              </div>
            </Link>
            <div className="poster-component-name flex-fill ms-2">
              <p className="mb-0 fw-semibold lh-sm">
                {props.user?.user_fullname}
              </p>
              <small className="text-secondary lh-sm">
                {formatter.format(new Date(poster?.time))}
              </small>
            </div>
          </div>
          <div>
            <p>{poster?.text}</p>

            <div id={"image" + poster?._id} className="carousel slide">
              <div className="carousel-inner">
                {poster?.photos?.map((picture, index) => {
                  let active = "carousel-item active";
                  let normal = "carousel-item";
                  return (
                    <div key={index} className={index === 0 ? active : normal}>
                      <img
                        src={`${host}/api/images/${picture}`}
                        key={index}
                        alt="img-status"
                        className="d-block w-100 actived"
                      />
                    </div>
                  );
                })}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target={"#image" + poster?._id}
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target={"#image" + poster?._id}
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="text-secondary">
            <LikeCount
              like={poster.likes}
              unlike={poster.unlikes}
              comment={poster.comments}
              share={poster.shares}
              post_id={poster._id}
            />
          </div>
          <div
            className="row gx-0 pt-1 pb-1"
            style={{
              borderBottom: "1px solid #ced0d4",
              borderTop: "1px solid #ced0d4",
            }}
          >
            <Like
              user_id={poster?.user_id}
              post_id={poster?._id}
              update={updatePoster}
              react={react}
              poster={poster}
              setReact={updateReact}
            />
            <div className="col">
              <button
                className="btn btn-light w-100"
                onClick={(e) => setPosterView(true)}
              >
                <span className="me-2">
                  <i className="fa-regular fa-comment"></i>
                </span>
                <span>Bình luận</span>
              </button>
            </div>
            <div className="col">
              <button className="btn btn-light w-100">
                <span className="me-2">
                  <i className="fa-regular fa-share-from-square"></i>
                </span>
                <span> Chia sẻ</span>
              </button>
            </div>
          </div>
          <WriteComment></WriteComment>
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
