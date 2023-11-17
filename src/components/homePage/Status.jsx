import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { host } from "../../env";
const Status = (props) => {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("");
  const formElement = useRef();
  const closeModal = useRef();
  const handleImageChange = (event) => {
    setImages(event.target.files);
  };

  const handleClickPost = (e) => {
    const formData = new FormData(formElement.current);

    fetch("/api/posts", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === "success") {
          setStatus("");
          props.setPost(data.data);
          alert("thêm bài viết thành công");
          closeModal.current.click();
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div
        className="row justify-content-center pt-4"
      >
        <div
          className="bg-light shadow-sm rounded-2 col-12"
          style={{ width: "95%", maxWidth: "562.4px", padding: "12px 16px" }}
        >
          <div className="d-flex">
            <Link to={`/profile?id=${props.user?._id}`}>
              <div>
                <img
                  style={{ height: "40px", width: "40px" }}
                  x="0"
                  y="0"
                  height="100%"
                  alt="demo Img"
                  width="100%"
                  className="rounded-circle"
                  src={props.user?.user_picture ? `${host}/api/images/${props.user?.user_picture}` : `${host}/default_avatar.png`}
                ></img>
              </div>
            </Link>

            <button
              className="btn btn-light border rounded-pill ms-2 w-100 text-body-tertiary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              {status ||
                props.user?.user_fullname + " ơi, bạn đang nghĩ gì thế?"}
            </button>
          </div>
          <div className="text-success">
            <hr />
          </div>
          <div className="row gx-0">
            <div className="col">
              <button
                className="btn btn-light w-100"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <span className="me-2">
                  <img
                    height="24"
                    width="24"
                    alt=""
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/yF/r/v1iF2605Cb5.png"
                  />
                </span>
                <span>Video</span>
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-light w-100"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <span className="me-2">
                  <img
                    height="24"
                    width="24"
                    alt=""
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/a6OjkIIE-R0.png"
                  />
                </span>
                <span>Ảnh</span>
              </button>
            </div>
            <div className="col d-flex justify-content-center">
              <button
                className="btn btn-light w-100"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <span className="me-2">
                  <img
                    height="24"
                    width="24"
                    alt=""
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/yMDS19UDsWe.png"
                  />
                </span>
                <span>Cảm xúc</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 fw-bold text-center w-100"
                id="exampleModalLabel"
              >
                Tạo bài viết
              </h1>
              <button
                ref={closeModal}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <span className="me-2 ms-2">
                  <img
                    style={{ height: "40px", width: "40px" }}
                    x="0"
                    y="0"
                    height="100%"
                    alt="demo Img"
                    width="100%"
                    className="rounded-circle"
                    src={props.user?.user_picture ? `${host}/api/images/${props.user?.user_picture}` : `${host}/default_avatar.png`}
                  ></img>
                </span>
                <span className="mb-0 fw-semibold lh-sm">
                  {props.user?.user_fullname}
                </span>
              </div>
              <form encType="multipart/form-data" ref={formElement}>
                <textarea
                  name="status"
                  className="form-control mt-2"
                  style={{ border: "none", boxShadow: "none" }}
                  rows="5"
                  value={status}
                  placeholder={
                    props.user?.user_fullname + " ơi, bạn đang nghĩ gì thế ?"
                  }
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                ></textarea>
                <label
                  htmlFor="formFileMultiple"
                  className="btn btn-light w-100"
                >
                  <span className="me-2">
                    <img
                      height="24"
                      width="24"
                      alt=""
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/a6OjkIIE-R0.png"
                    />
                  </span>
                  <span>Ảnh</span>
                  {Array.from(images).map((img, index) => (
                    <p key={index}>{img.name}</p>
                  ))}
                </label>
                <input
                  name="images"
                  className="d-none"
                  type="file"
                  id="formFileMultiple"
                  accept=".jpg, .jpeg, .png"
                  multiple
                  onChange={handleImageChange}
                ></input>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={handleClickPost}
                disabled={!status}
              >
                Đăng
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Status;
