import { useEffect, useState } from "react";
import NotifyBar from "./NotifyBar";
import { host } from "../../../env";
const NotificationBoard = ({ close }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch(host + "/api/notifications", { credentials: "include" })
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
    fetch(host + "/api/notifications/delete", { credentials: "include" })
      .then((result) => result.json())
      .then((data) => {
        if (data.status === "success") setNotifications([]);
        else window.alert(data.message);
      });
  };
  const deleteOneNotification = (notify) => {
    setNotifications(notifications.filter((value) => value._id !== notify._id));
  };
  return (
    <div className="p-3 shadow-md rounded-md absolute -right-12 bg-white min-w-[22rem] md:right-0">
      <div className="text-center text-xl font-semibold">Danh sách thông báo</div>
      <hr></hr>
      <div className="flex justify-end">
        <button
          className="bg-white hover:bg-gray-100 text-blue-500 px-4 py-2 rounded-md text-sm"
          onClick={deleteAllNotifications}
        >
          Xóa hết
        </button>
      </div>
      {notifications.length > 0 ? (
        notifications.map((notify) => {
          return (
            <NotifyBar
              notify={notify}
              delNotify={deleteOneNotification}
              key={notify._id}
            />
          );
        })
      ) : (
        <div className="text-center fs-6">Không có thông báo</div>
      )}
    </div>
  );
};

export default NotificationBoard;
