const options = {
    weekday: "long", // Thứ
    hour: "numeric", // Giờ
    minute: "numeric", // Phút
    day: "numeric", // Ngày
    month: "long", // Tháng
    year: "numeric", // Năm
  };
  
  const formatter = new Intl.DateTimeFormat("vi-VN", options);
  export default formatter