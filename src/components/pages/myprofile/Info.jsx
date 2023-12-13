const Info = (props) => {
  const getbirthday = () => {
    let index = props.user?.user_birthday?.indexOf("T");
    return props.user?.user_birthday?.slice(0, index);
  };
  return (
    <div className="flex justify-center mt-4">
      <div
        className="bg-white shadow-sm rounded-xl col-12 dark:bg-opacity-10"
        style={{
          width: "95%",
          maxWidth: "562.4px",
          padding: "12px 16px 0px 16px",
        }}
      >
        <h3 className="text-center font-bold text-xl">Giới thiệu</h3>
        <hr />
        <p className="flex">
          <span className="mx-4 inline-block">Tên:</span>
          <span className="font-semibold">{props.user?.user_fullname}</span>
        </p>
        <p className="flex">
          <span className="mx-4 inline-block">Giới tính:</span>
          <span className="font-semibold">{props.user?.user_gender}</span>
        </p>
        <p className="flex">
          <span className="mx-4 inline-block">Công việc:</span>
          <span className="font-semibold">{props.user?.user_work_title}</span>
        </p>
        <p className="flex">
          <span className="mx-4 inline-block">Nơi làm việc:</span>
          <span className="font-semibold">{props.user?.user_work_place}</span>
        </p>
        <p className="flex">
          <span className="mx-4 inline-block">Thành phố hiện tại:</span>
          <span className="font-semibold">{props.user?.user_current_city}</span>
        </p>
        <p className="flex">
          <span className="mx-4 inline-block">Đến từ:</span>
          <span className="font-semibold">{props.user?.user_hometown}</span>
        </p>
        <p className="flex">
          <span className="mx-4 inline-block">Sinh nhật:</span>
          <span className="font-semibold">{getbirthday()}</span>
        </p>
      </div>
    </div>
  );
};
export default Info;
