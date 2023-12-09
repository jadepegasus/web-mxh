import { useState, useRef, useEffect } from "react";
import { host } from "../../env";
const EditPoster = (props) => {
  const [images, setImages] = useState([]);
  const [text, setText] = useState(props.post?.text);
  const formElement = useRef();
  const closeModal = useRef();
  const editModal = useRef();
  const textInput = useRef();
  const [prevImages, setPrevImages] = useState(props.post.photos);
  const [imageRemove, setImageRemove] = useState([]);

  const handleImageChange = (event) => {
    setImages(event.target.files);
  };

  const removeImage = (image_id) => {
    setPrevImages(prevImages.filter((value) => value !== image_id));
    setImageRemove([...imageRemove, image_id]);
  };

  const handleEditButton = () => {
    const formData = new FormData(formElement.current);
    formData.append("imageRemove", JSON.stringify(imageRemove));
    formData.append("status", text);

    fetch(host + "/api/posts/" + props.post?._id, {
      credentials: "include",
      method: "PUT",
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
          window.alert("sửa ảnh thành công");
          props.update(data.data);
          closeModal.current.click();
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  console.log(text);
  useEffect(() => {
    editModal.current.showModal();
    textInput.current.innerText = props.post?.text;
  }, []);

  return (
    <dialog className="modal" id="editPostModal" ref={editModal}>
      <div className="modal-box rounded-md overflow-hidden p-0 max-w-[34rem] max-h-[100vh]">
        <div className="py-4">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-gray-200"
              onClick={props.close}
            >
              ✕
            </button>
          </form>
          <h1
            className="font-bold text-2xl text-center w-full border-b pb-4 shadow-sm"
            id="exampleModalLabel"
          >
            Sửa bài viết
          </h1>
          <div className="w-full max-h-[70vh] overflow-auto">
            <div className="px-4 my-1">
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
                    className="outline-none text-xl whitespace-pre"
                    contentEditable
                    onInput={(e) => setText(e.target.innerText)}
                    ref={textInput}
                  ></div>
                  <div className="absolute top-0 pointer-events-none text-gray-500 font-thin text-xl">
                    {!text
                      ? props.user?.user_fullname + " ơi, bạn đang nghĩ gì thế?"
                      : ""}
                  </div>
                </div>

                <div className="rounded-md border p-1 py-2 my-2">
                  {prevImages.map((picture, index) => {
                    return (
                      <span
                        className="relative inline-block w-1/2 px-1"
                        key={index}
                      >
                        <div
                          className="btn btn-sm btn-circle absolute right-0 top-0 bg-gray-100/50 shadow-md"
                          onClick={(e) => removeImage(picture)}
                        >
                          ✕
                        </div>
                        <img
                          alt="img-post"
                          src={`${host}/api/images/${picture}`}
                          className="w-full object-cover h-60 border rounded-md"
                        />
                      </span>
                    );
                  })}
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
                  htmlFor="formFileEditMultiple"
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
                  id="formFileEditMultiple"
                  accept=".jpg, .jpeg, .png"
                  multiple
                  onChange={handleImageChange}
                ></input>
              </form>
            </div>
          </div>
          <div className="pt-4 border-t">
            <button
              type="button"
              className="btn w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:brightness-90 text-white"
              onClick={handleEditButton}
            >
              Sửa
            </button>
          </div>
        </div>
      </div>
      <form
        method="dialog"
        className="modal-backdrop"
        ref={closeModal}
        onClick={props.close}
      >
        <button>close</button>
      </form>
    </dialog>
  );
};

export default EditPoster;
