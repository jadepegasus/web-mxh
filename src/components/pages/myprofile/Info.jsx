const Info = (props) => {
  return (
      <div className="row justify-content-center mt-4">
        <div
          className="bg-light shadow-sm rounded-2 col-12"
          style={{
            width: "95%",
            maxWidth: "562.4px",
            padding: "12px 16px 0px 16px",
          }}
        >
        <h3>Giới thiệu</h3>
        <hr />
        <p>Tên: <span className="fw-semibold">{props.user?.user_fullname}</span> </p>
        <p>Giới tính: <span className="fw-semibold">{props.user?.user_gender}</span> </p>
        <p>Công việc: <span className="fw-semibold">{props.user?.user_work_title}</span></p>
        <p>Nơi làm việc: <span className="fw-semibold">{props.user?.user_work_place}</span></p>
        <p>Thành phố hiện tại: <span className="fw-semibold">{props.user?.user_current_city}</span></p>
        <p>Đến từ: <span className="fw-semibold">{props.user?.user_hometown}</span></p>
        <p>Sinh nhật: <span className="fw-semibold">{props.user?.user_birthday}</span></p>
        </div>
      </div>
  );
};
export default Info;
