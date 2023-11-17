import { host } from "../../../env";
// import EditInfo from "./EditInfo";

const Cover = (props) => {
  return (
    <div
      className="d-flex justify-content-center shadow-sm"
      style={{ backgroundColor: "white" }}
    >
      <div className="w-100" style={{ maxWidth: "1000px" }}>
        <div
          className="position-relative w-100"
          style={{ paddingTop: "37.037%" }}
        >
          <div className="position-absolute top-0 start-0 end-0 bottom-0">
            <img
              src={
                props.user?.user_cover
                  ? `${host}/api/images/${props.user?.user_cover}`
                  : `${host}/default_cover.png`
              }
              height="100%"
              width="100%"
              className="rounded-4"
              alt="cover_image"
            />
          </div>
        </div>
        <div
          className="position-relative"
          style={{ paddingTop: "50px", paddingBottom: "150px" }}
        >
          <div className="position-absolute d-flex justify-content-center flex-column end-50 translate-middle-y">
            <div>
              <img
                style={{
                  height: "168px",
                  width: "168px",
                  border: "6px solid white",
                }}
                height="100%"
                width="100%"
                className="rounded-circle"
                alt="avatar"
                src={
                  props.user?.user_picture
                    ? `${host}/api/images/${props.user.user_picture}`
                    : `${host}/default_avatar.png`
                }
              ></img>
            </div>
            <div className="text-center">
              <p className="mt-2 fs-2 fw-bold">{props.user?.user_fullname}</p>
            </div>
            {props.readonly || (
              <button
                type="button"
                className="btn btn-light shadow-sm border"
                data-bs-toggle="modal"
                data-bs-target="#editProfileModal"
              >
                <i className="fa-solid fa-pen"></i>
                <span className="ms-2 fw-semibold">Sửa trang cá nhân</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cover;
