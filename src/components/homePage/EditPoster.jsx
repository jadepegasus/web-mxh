import { useState, useRef } from "react";
import { host } from "../../env";
const EditPoster = (props) => {
  const [images, setImages] = useState([]);
  const [text, setText] = useState(null)
  const formElement = useRef();
  const closeModal = useRef()

  const handleImageChange = (event) => {
    setImages(event.target.files);
  };

  const handleEditButton = () => {
    const formData = new FormData(formElement.current)

    fetch('/api/posts/' + props.post?._id, {
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
        window.alert('sửa ảnh thành công') 
        props.update(data.data)    
        closeModal.current.click()
      } else {
        alert(data.message)
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 z-3 bg-secondary bg-opacity-50"
    ref={closeModal}
    onClick={props.close}>
      <div
        className="position-absolute top-50 start-50 translate-middle bg-light rounded-4"
        style={{ maxWidth: "90%", width: "540px", overflowY:'auto', maxHeight: '75vh' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="text-center pt-3">
          <h1>Sửa bài viết</h1>
          <hr />
        </div>
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
              src={props.user?.user_picture ?  `${host}/api/images/${props.user?.user_picture}` : `${host}/default_avatar.png`}
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
            value={text!=null ? text : props.post?.text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>

          <div>
            {props.post?.photos?.map((picture, index) => {
              return <img
              alt='img-post'
                key={index}
                src={`${host}/api/images/${picture}`}
                width='30%'
              />
            })}
          </div>

          <label htmlFor="formFileEditMultiple" className="btn btn-light w-100">
            <span className="me-2">
              <img
                height="24"
                width="24"
                alt=""
                src="https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/a6OjkIIE-R0.png"
              />
            </span>
            <span>Thêm ảnh</span>
            {Array.from(images).map((img, index) => (
              <p key={index}>{img.name}</p>
            ))}
          </label>
          <input
            name="images"
            className="d-none"
            type="file"
            id="formFileEditMultiple"
            accept=".jpg, .jpeg, .png"
            multiple
            onChange={handleImageChange}
          ></input>
        </form>
        <hr/>
        <button
          type="button"
          className="btn btn-primary w-100 mb-2"
          onClick={handleEditButton}
        >
          Sửa
        </button>
      </div>
    </div>
  );
};

export default EditPoster;
