import { useEffect, useState } from "react";
import NotifyBar from "./NotifyBar";
import { host } from "../../../env";
const NotificationBoard = ({ close }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch(host+ "/api/notifications", {credentials: 'include'})
      .then((result) => result.json())
      .then((data) => {
        if (data.status === "success")
          setNotifications(
            data.data.sort((a, b) => {
              return a.time < b.time ? 1 : -1;
            })
          );
      });
  }, []);
  const deleteAllNotifications = () => {
    fetch(host+ "/api/notifications/delete", {credentials: 'include'})
      .then((result) => result.json())
      .then((data) => {
        if (data.status === "success") setNotifications([])
        else window.alert(data.message)
      });
  };
  const deleteOneNotification = (notify) => {
    setNotifications(notifications.filter((value) => value._id !== notify._id))
  }
  return (
    <div
      className="position-absolute z-3 p-3 shadow rounded-2 absolute"
      style={{ backgroundColor: "white", width: "20rem", right: "0px" }}
    >
      <div className="text-center fs-4">Danh sách thông báo</div>
      <hr></hr>
      <button className="btn btn-primary w-100" onClick={deleteAllNotifications}>Xóa hết</button>
      {notifications.length > 0 ? (
        notifications.map((notify) => {
          return <NotifyBar notify={notify} delNotify={deleteOneNotification} key={notify._id} />;
        })
      ) : (
        <div className="text-center fs-6">Không có thông báo</div>
      )}
    </div>
  );
};

export default NotificationBoard;
