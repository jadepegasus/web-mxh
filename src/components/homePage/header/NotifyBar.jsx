import { Link } from "react-router-dom";
import { host } from "../../../env";
import formatter from "../../../unity/formatTime";

const NotifyBar = ({ notify, delNotify }) => {
  const handleDeleteNotify = (e) => {
    e.preventDefault()
    fetch(host + "/api/notifications/delete/" + notify._id, {
      credentials: "include",
    })
      .then((result) => result.json())
      .then((data) => {
        if (data.status === "success") delNotify(notify);
        else window.alert(data.message);
      });
  };

  return (
    <Link
      to={notify?.url}
      className="flex justify-between items-center hover:bg-gray-100 px-2 rounded-md"
    >
      <div>
        {notify?.action === "addfriend" && (
          <i className="fa-solid fa-user-plus text-blue-500 hover:animate-shaking-like text-3xl"></i>
        )}
      </div>
      <div className="ms-2">
        <p className="text-md font-semibold">{notify?.message}</p>
        <p className="text-xs text-gray-400">
          {formatter.format(new Date(notify?.time))}
        </p>
      </div>
      <div className="px-3 py-2 hover:bg-gray-200 rounded-full" onClick={handleDeleteNotify}>
        <i className="fa-solid fa-trash"></i>
      </div>
    </Link>
  );
};
export default NotifyBar;
