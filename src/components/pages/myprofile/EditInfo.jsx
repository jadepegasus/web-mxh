import { useState, useRef } from "react";
import { host } from "../../../env";

const EditInfo = (props) => {
  const [avatar, setAvatar] = useState();
  const [cover, setCover] = useState();
  const formElement = useRef();
  const closeButton = useRef();

  const getbirthday = () => {
    let index = props.user?.user_birthday?.indexOf("T");
    return props.user?.user_birthday?.slice(0, index);
  };

  const handleEditButton = () => {
    const formData = new FormData(formElement.current);

    fetch(host + "/api/users/" + props.user?._id, {
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
          props.editUser(data);
          window.alert("sửa thông tin thành công");
          closeButton.current.click();
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <dialog className="modal" id="editProfileModal">
      <div className="modal-box rounded-md overflow-hidden p-0 max-w-[34rem] max-h-[100vh]">
        <div className="py-4">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-gray-200"
              ref={closeButton}
            >
              ✕
            </button>
          </form>
          <h1 className="font-bold text-2xl text-center w-full border-b pb-4 shadow-sm">
            Sửa thông tin
          </h1>
          <div className="w-full max-h-[70vh] overflow-auto">
            <form className='px-4 my-1' encType="multipart/form-data" ref={formElement}>
              <label className="form-control w-full">
                <span>Tên:</span>
                <input
                  className="input input-bordered w-full text-gray-400 focus:text-black"
                  type="text"
                  name="user_fullname"
                  defaultValue={props.user?.user_fullname || ""}
                />
              </label>

              <label className="">
                <span>Giới tính:</span>
                <input
                  className="input input-bordered w-full text-gray-400 focus:text-black"
                  type="text"
                  name="user_gender"
                  defaultValue={props.user?.user_gender || ""}
                />
              </label>

              <label className="">
                <span>Công việc:</span>
                <input
                  className="input input-bordered w-full text-gray-400 focus:text-black"
                  type="text"
                  name="user_work_title"
                  defaultValue={props.user?.user_work_title || ""}
                />
              </label>

              <label className="">
                <span>Nơi làm việc:</span>
              </label>
              <input
                className="input input-bordered w-full text-gray-400 focus:text-black"
                type="text"
                name="user_work_place"
                defaultValue={props.user?.user_work_place || ""}
              />

              <label className="">
                <span>Thành phố hiện tại:</span>
              </label>
              <input
                className="input input-bordered w-full text-gray-400 focus:text-black"
                type="text"
                name="user_current_city"
                defaultValue={props.user?.user_current_city || ""}
              />
              <label className="">
                <span>Đến từ:</span>
              </label>
              <input
                className="input input-bordered w-full text-gray-400 focus:text-black"
                type="text"
                name="user_hometown"
                defaultValue={props.user?.user_hometown || ""}
              />

              <label className="">
                <span>Sinh nhật:</span>
              </label>
              <input
                className="input input-bordered w-full text-gray-400 focus:text-black"
                type="date"
                name="user_birthday"
                defaultValue={getbirthday() || ""}
              />

              <label className="">
                <p> Thay avatar:</p>
                <input
                  name="images"
                  className="file-input file-input-bordered w-full"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => setAvatar(e.target.files[0])}
                ></input>
              </label>

              <label className="">
                <p> Thay ảnh bìa:</p>
                <input
                  name="images"
                  className="file-input file-input-bordered w-full"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => setCover(e.target.files[0])}
                ></input>
              </label>
              <input
                type="text"
                className="hidden"
                name="whatIsChange"
                value={(avatar ? "1" : "0") + (cover ? "1" : "0")}
                readOnly
              />
            </form>
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
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
export default EditInfo;
