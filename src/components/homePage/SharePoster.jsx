import { useState, useRef, useEffect } from "react";
import { host } from "../../env";
const SharePoster = (props) => {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("");
  const formElement = useRef();
  const closeModal = useRef();
  const editStatus = useRef();
  const shareModal = useRef();

  useEffect(() => {
    shareModal.current.showModal();
  }, []);

  const handleImageChange = (event) => {
    setImages(event.target.files);
  };

  const handleClickShare = (e) => {
    const formData = new FormData(formElement.current);
    formData.append("status", status);
    formData.append("share_from", props.post?._id);

    fetch(host + "/api/posts", {
      credentials: "include",
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
          alert("Đã chia sẻ bài viết");
          props?.update({...props?.post, shares: props?.post?.shares + 1})
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
      <dialog className="modal" ref={shareModal}>
        <div className="modal-box rounded-md">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-gray-200"
              ref={closeModal}
              onClick={props.close}
            >
              ✕
            </button>
          </form>
          <h1
            className="font-bold text-2xl text-center w-full"
            id="exampleModalLabel"
          >
            Chia sẻ bài viết của {props.user?.user_fullname}
          </h1>
          <div className="w-full border-t-[1px] mt-4">
            <form encType="multipart/form-data" ref={formElement}>
              <div className="my-4 relative min-h-[10rem]">
                <div
                  className="outline-none text-xl whitespace-pre max-h-72 overflow-auto"
                  ref={editStatus}
                  contentEditable
                  onInput={(e) => setStatus(e.target.innerText)}
                ></div>
                <div className="absolute top-0 pointer-events-none text-gray-500 font-thin text-xl">
                  {!status ? "Aa" : ""}
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
                htmlFor="formFileMultipleShare"
                className="w-full flex p-4 rounded-lg border-2 cursor-pointer font-semibold justify-between"
              >
                <span>Thêm ảnh vào bài chia sẻ</span>
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
                id="formFileMultipleShare"
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
              onClick={handleClickShare}
            >
              Chia sẻ
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop" onClick={props.close}>
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};
export default SharePoster;
