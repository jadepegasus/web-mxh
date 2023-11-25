import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { host } from "../../env";
import Like from "../like/Like";
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
const PosterView = ({ close, post_id, update, react, setReact}) => {
  const [poster, setPoster] = useState();
  useEffect(() => {
    if (post_id) {
      fetch("/api/posts/" + post_id)
        .then((result) => result.json())
        .then((data) => {
          if (data.status === "success") {
            setPoster(data.data);
          }
        });
    }
  }, [post_id]);
  const updatePoster = (poster) => {
    update(poster);
    setPoster(poster);
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 z-3 bg-secondary bg-opacity-50"
      onClick={close}
    >
      <div
        className="position-absolute start-50 translate-middle-x bg-light rounded-4 pb-5"
        style={{
          maxWidth: "90%",
          width: "700px",
          overflowY: "auto",
          height: "80vh",
          top: "5%",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center pt-3">
          <button
            type="button"
            className="btn-close float-end"
            aria-label="Close"
            onClick={close}
          ></button>
        </div>
        <div className="d-flex position-relative ms-3 me-3">
          <Link to={`/profile?id=${poster?.user._id}`}>
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
                  poster?.user?.user_picture
                    ? `${host}/api/images/${poster?.user?.user_picture}`
                    : `${host}/default_avatar.png`
                }
              ></img>
            </div>
          </Link>
          <div className="flex-fill ms-2">
            <p className="mb-0 fw-semibold lh-sm">
              {poster?.user?.user_fullname}
            </p>
            <small className="text-secondary lh-sm">
              {poster?.time && formatter.format(new Date(poster?.time))}
            </small>
          </div>
        </div>
        <div className="ms-3 me-3">
          <p>{poster?.text}</p>
        </div>
        <div id="image-calousel" className="carousel slide carousel-dark">
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
            data-bs-target="#image-calousel"
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
            data-bs-target="#image-calousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div className="text-success">
          <LikeCount
            like={poster?.likes}
            unlike={poster?.unlikes}
            comment={poster?.comments}
            share={poster?.shares}
            post_id={poster?._id}
          />
          <hr />
          <div className="row gx-0 mb-2">
            <Like
              user_id={poster?.user_id}
              post_id={poster?._id}
              update={updatePoster}
              poster={poster}
              react={react}
              setReact={setReact}
            />
            <div className="col">
              <button className="btn btn-light w-100">
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
          <hr></hr>
        </div>
      </div>
        <WriteComment></WriteComment>
    </div>
  );
};
export default PosterView;
