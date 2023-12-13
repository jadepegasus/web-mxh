import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { host } from "../../env";
const Status = (props) => {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("");
  const formElement = useRef();
  const closeModal = useRef();
  const editStatus = useRef();
  const handleImageChange = (event) => {
    setImages(event.target.files);
  };

  const handleClickPost = (e) => {
    const formData = new FormData(formElement.current);
    formData.append('status', status)

    fetch(host+"/api/posts", {
      credentials: 'include',
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
          editStatus.current.innerText = "";
          formElement.current.reset()
          props.setPost({ ...data.data, user: props.user });
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
      <div className="flex justify-center pt-4">
        <div className="bg-white shadow-sm rounded-lg col-12 w-full sm:w-[562.4px] dark:bg-opacity-10">
          <div className="flex mx-4 my-3">
            <Link to={`/profile?id=${props.user?._id}`}>
              <div className="avatar">
                <div className="w-10 rounded-full hover:brightness-90">
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

            <button
              className="btn rounded-full ms-2 grow h-10 min-h-fit justify-start text-gray-500 font-normal"
              onClick={() => {
                document.getElementById("addStatusModal")?.showModal();
              }}
            >
              {status ||
                props.user?.user_fullname + " ơi, bạn đang nghĩ gì thế?"}
            </button>
          </div>
          <div className="grid grid-cols-3 border-t-[1px] mx-4">
            <button
              className="btn w-full my-2 bg-transparent border-none shadow-none hover:bg-gray-100"
              onClick={() => {
                document.getElementById("addStatusModal")?.showModal();
              }}
            >
              <span className="me-2 hover:animate-shaking-like">
                <img
                  height="24"
                  width="24"
                  alt=""
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/yF/r/v1iF2605Cb5.png"
                />
              </span>
              <span>Video</span>
            </button>
            <button
              className="btn w-full my-2 bg-transparent border-none shadow-none hover:bg-gray-100"
              onClick={() => {
                document.getElementById("addStatusModal")?.showModal();
              }}
            >
              <span className="me-2 hover:animate-shaking-like">
                <img
                  height="24"
                  width="24"
                  alt=""
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/a6OjkIIE-R0.png"
                />
              </span>
              <span>Ảnh</span>
            </button>
            <button
              className="btn btn-light w-full my-2 bg-transparent border-none shadow-none hover:bg-gray-100"
              onClick={() => {
                document.getElementById("addStatusModal")?.showModal();
              }}
            >
              <span className="me-2 hover:animate-shaking-like">
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

      <dialog className="modal" id="addStatusModal">
        <div className="modal-box rounded-md">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-gray-200"
              ref={closeModal}
            >
              ✕
            </button>
          </form>
          <h1
            className="font-bold text-2xl text-center w-full"
            id="exampleModalLabel"
          >
            Tạo bài viết
          </h1>
          <div className="w-full border-t-[1px] mt-4">
            <div className="flex items-center justify-start">
              <div className="avatar mt-4">
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
              <div className="mb-0 font-semibold leading-3 mt-4 ms-2">
                {props.user?.user_fullname}
              </div>
            </div>
            <form encType="multipart/form-data" ref={formElement}>
              <div className="my-4 relative min-h-[10rem]">
                <div
                  className="outline-none text-xl whitespace-pre max-h-72 overflow-auto"
                  ref={editStatus}
                  contentEditable
                  onInput={(e) => setStatus(e.target.innerText)}
                ></div>
                <div className="absolute top-0 pointer-events-none text-gray-500 font-thin text-xl">
                  {!status
                    ? props.user?.user_fullname + " ơi, bạn đang nghĩ gì thế?"
                    : ""}
                </div>
              </div>
              {Array.from(images).length ? (
                <div className="flex justify-center">
                  <div className="border-x-2 border-t-2 w-4/5 px-4 py-2 rounded-tl-2xl rounded-tr-2xl">
                    {Array.from(images).map((img, index) => (
                      <p key={index}>{img.name}</p>
                    ))}
                  </div>
                </div>
              ) : (
                ""
              )}
              <label
                htmlFor="formFileMultiple"
                className="w-full flex p-4 rounded-lg border-2 cursor-pointer font-semibold justify-between"
              >
                <span>Thêm ảnh vào bài viết của bạn</span>
                <span className="me-2">
                  <img
                    className="w-6 h-6"
                    alt=""
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/a6OjkIIE-R0.png"
                  />
                </span>
              </label>
              <input
                name="images"
                className="hidden"
                type="file"
                id="formFileMultiple"
                accept=".jpg, .jpeg, .png"
                multiple
                onChange={handleImageChange}
              ></input>
            </form>
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="btn w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:brightness-90 text-white"
              onClick={handleClickPost}
              disabled={!status}
            >
              Đăng
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};
export default Status;
