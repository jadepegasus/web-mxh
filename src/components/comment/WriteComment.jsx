
const WriteComment = () => {
    return(
        <div className="border rounded-bottom-4 start-50 translate-middle-x position-absolute"
        style={{
            maxWidth: "90%",
            width: "700px",
            top: '80vh',
            backgroundColor: 'white',
            overflow: 'hidden'
          }}
          onClick={e => e.stopPropagation()}
        >
            <form encType="multipart/form-data">
                <input
                  name="text"
                  className="form-control mt-2"
                  style={{ border: "none", boxShadow: "none" }}
                  rows="3"
                  placeholder='viết bình luận'
                ></input>
                <label
                  htmlFor="formFileMultiple"
                  className="btn btn-light float-start w-50"
                >
                  <span className="me-2">
                    <img
                      height="24"
                      width="24"
                      alt=""
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/a6OjkIIE-R0.png"
                    />
                  </span>
                  <span>thêm ảnh</span>
                </label>
                  <span className="btn btn-primary w-50">Gửi</span>
                <input
                  name="images"
                  className="d-none"
                  type="file"
                  id="formFileMultiple"
                  accept=".jpg, .jpeg, .png"
                ></input>
              </form>
        </div>
    )
}
export default WriteComment