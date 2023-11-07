const Poster = () => {
    return (
        <div className="row justify-content-center mt-4">
        <div
          className="poster-component bg-light shadow-sm rounded-2 col-12"
          style={{width: "95%", maxWidth: "562.4px", padding: "12px 16px"}}
        >
          <div className="poster-component-person d-flex">
            <div className="poster-component-avatar">
              <img
                style={{height: "40px", width: "40px"}}
                x="0"
                y="0"
                height="100%"
                width="100%"
                className="rounded-circle"
                alt="avatar"
                src="data:image/png;base64,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"
              ></img>
            </div>
            <div
              className="poster-component-name flex-fill ms-2"
            >
              <p className="mb-0 fw-semibold lh-sm">Hà Bùi Phúc</p>
              <small className="text-secondary lh-sm">2 tháng trước</small>
            </div>
          </div>
          <div className="poster-component-content">
              <p>This is a first status</p>
              <img src="https://nhadepso.com/wp-content/uploads/2023/01/tong-hop-50-hinh-anh-thien-nhien-dep-hung-vi-tho-mong_1.jpg" alt="img-status" width="100%"/>
          </div>
          <div className="text-success">
            <hr />
          </div>
          <div className="poster-component-footer row" style={{height: "24px", fontSize: "1rem"}}>
            <div className="col d-flex justify-content-center">
              <p><i className="fa-regular fa-thumbs-up"></i>  Thích</p>
            </div>
            <div className="col d-flex justify-content-center">
              <p><i className="fa-regular fa-comment"></i>  Bình Luận</p>
            </div>
            <div className="col d-flex justify-content-center">
              <p><i className="fa-regular fa-share-from-square"></i>  Chia sẻ</p>
            </div>
          </div>
        </div>
      </div>
    )
}
export default Poster;