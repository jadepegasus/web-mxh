const WriteComment = () => {
  return (
    <div className="w-100" onClick={(e) => e.stopPropagation()}>
      <form encType="multipart/form-data" className="m-3  position-relative">
        <textarea
          name="text"
          className="form-control rounded-4"
          style={{ border: "none", boxShadow: "none", backgroundColor: '#f0f2f5' }}
          placeholder="viết bình luận..."
        ></textarea>
          <label
            htmlFor="formFileMultiple"
            className="position-absolute"
            style={{left: '2%', bottom: '5%', cursor: 'pointer'}}
          >
            <i className="fa-regular fa-image"></i>
          </label>
        <span className="position-absolute fs-4 bottom-0"
        style={{right: '2%', cursor: 'pointer'}}
        ><i className="fa-regular fa-paper-plane"></i></span>
        <input
          name="images"
          className="d-none"
          type="file"
          id="formFileMultiple"
          accept=".jpg, .jpeg, .png"
        ></input>
      </form>
    </div>
  );
};
export default WriteComment;
