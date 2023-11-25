import { host } from "../../env";
import { useState } from "react";
import EditPoster from "./EditPoster";
import { Link } from "react-router-dom";
import Like from "../like/Like";
import UsersLiked from "../like/UsersLiked";
const options = {
  weekday: 'long', // Thứ
  hour: 'numeric', // Giờ
  minute: 'numeric', // Phút
  day: 'numeric', // Ngày
  month: 'long', // Tháng
  year: 'numeric' // Năm
};

const formatter = new Intl.DateTimeFormat('vi-VN', options);

const Poster = (props) => {
  const [edit, setEdit] = useState(false);
  const [poster, SetPoster] = useState(props.post)
  const [like, setLike] = useState({ likes: poster.likes, unlikes: poster.unlikes })
  const [usersLiked, setUsersLiked] = useState(false)

  const closeUsersLiked = () => {
    setUsersLiked(false)
  }

  const setLikes = (likes) => {
    setLike(likes)
  }

  const closeEdit = () => {
    setEdit(false);
  };
  const updatePoster = (u_poster) => {
    SetPoster(u_poster)
  }
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
              <small className="text-secondary lh-sm">{formatter.format(new Date(poster?.time))}</small>
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
          <div className="text-success">
            <div className="d-flex justify-content-between">
              <small style={{cursor: 'pointer'}} onClick={e => setUsersLiked(true)}>{like.likes} thích, {like.unlikes} không thích</small>
              <small>{poster?.comments} bình luận, {poster?.shares} chia sẻ</small>
            </div>
            <hr />
          </div>
          <div className="row gx-0 mb-2">
            <Like user_id={poster?.user_id} post_id={poster?._id} set_like={setLikes} like={like} />
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
      {usersLiked && <UsersLiked close={closeUsersLiked} post_id={poster._id} />}
    </>
  );
};
export default Poster;
