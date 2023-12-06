import { useState, useRef } from "react";
import { host } from "../../../env";

const EditInfo = (props) => {
  const [avatar, setAvatar] = useState();
  const [cover, setCover] = useState();
  const formElement = useRef()
  const closeButton = useRef()

  const getbirthday = () => {
    let index = props.user?.user_birthday?.indexOf("T")
    return props.user?.user_birthday?.slice(0, index)
  }

  const handleEditButton = () => {
    const formData = new FormData(formElement.current)

    fetch(host+'/api/users/' + props.user?._id, {
      credentials: 'include',
      method: 'PUT',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if(data.status === "success") {  
        props.editUser(data)
        window.alert('sửa thông tin thành công') 
        closeButton.current.click()
      } else {
        alert(data.message)
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <>
      <div
        className="modal fade"
        id="editProfileModal"
        tabIndex="0"
        aria-labelledby="editProfileModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="editProfileModalLabel">
                Sửa thông tin
              </h1>
              <button
              ref={closeButton}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form encType="multipart/form-data" ref={formElement}>
                <label className="form-label" htmlFor="myName">
                  Tên:
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="myName"
                  name="user_fullname"
                  defaultValue={props.user?.user_fullname || ''}
                />

                <label className="form-label" htmlFor="myGender">
                  Giới tính:
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="myGender"
                  name="user_gender"
                  defaultValue={props.user?.user_gender || ''}
                />

                <label className="form-label" htmlFor="myWork">
                  Công việc:
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="myWork"
                  name="user_work_title"
                  defaultValue={props.user?.user_work_title || ''}
                />

                <label className="form-label" htmlFor="myWorkPlace">
                  Nơi làm việc:
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="myWorkPlace"
                  name="user_work_place"
                  defaultValue={props.user?.user_work_place || ''}
                />

                <label className="form-label" htmlFor="myCity">
                  Thành phố hiện tại:
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="myCity"
                  name="user_current_city"
                  defaultValue={props.user?.user_current_city || ''}
                />
                <label className="form-label" htmlFor="myCity">
                  Đến từ:
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="myCity"
                  name="user_hometown"
                  defaultValue={props.user?.user_hometown || ''}
                />

                <label className="form-label" htmlFor="myBirthday">
                  Sinh nhật:
                </label>
                <input
                  className="form-control"
                  type="date"
                  id="myBirthday"
                  name="user_birthday"
                  defaultValue={getbirthday() || ''}
                />

                <label htmlFor="myAvatar" className="btn btn-light w-100">
                  <span className="me-2">
                    <img
                      height="24"
                      width="24"
                      alt=""
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/a6OjkIIE-R0.png"
                    />
                  </span>
                  <span> Thay avatar</span>
                  <p>{avatar?.name}</p>
                </label>
                <input
                  name="images"
                  className="d-none"
                  type="file"
                  id="myAvatar"
                  accept=".jpg, .jpeg, .png"
                  onChange={e => setAvatar(e.target.files[0])}
                ></input>

                <label htmlFor="myCover" className="btn btn-light w-100">
                  <span className="me-2">
                    <img
                      height="24"
                      width="24"
                      alt=""
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/a6OjkIIE-R0.png"
                    />
                  </span>
                  <span> Thay ảnh bìa</span>
                  <p>{cover?.name}</p>
                </label>
                <input
                  name="images"
                  className="d-none"
                  type="file"
                  id="myCover"
                  accept=".jpg, .jpeg, .png"
                  onChange={e => setCover(e.target.files[0])}
                ></input>
                <input type="text"
                className="d-none"
                name="whatIsChange"
                value={(avatar ? '1' : '0') + (cover ? '1' : '0')}
                readOnly
                 />
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleEditButton}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditInfo;
