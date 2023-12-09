import { Link } from "react-router-dom";
import { host } from "../../../env";
const UserBar = ({ user, react }) => {
  return (
    <Link
      to={`/profile?id=${user?._id}`}
      className="bg-white rounded-md flex justify-between p-2 mx-2 hover:bg-gray-100"
    >
      <div className="flex items-center">
        <div
          className={`avatar ${
            user?.user_activated === "on" ? "online" : "offline"
          }`}
        >
          <div className="w-9 rounded-full">
            <img
              alt="anh"
              src={
                user?.user_picture
                  ? `${host}/api/images/${user?.user_picture}`
                  : `${host}/default_avatar.png`
              }
            />
          </div>
        </div>
        <span className="ms-2">{user?.user_fullname}</span>
      </div>
      {!react ? (
        <div
          className="btn btn-sm btn-circle btn-ghost hover:bg-gray-200"
          onClick={(e) => {
            e.preventDefault();
            console.log(e.currentTarget.parentNode.classList.add("hidden"));
          }}
        >
          ✕
        </div>
      ) : react === "like" ? (
        <div>
          <i className="fa-solid fa-thumbs-up text-blue-500 animate-shaking-like text-2xl"></i>
        </div>
      ) : (
        <div>
          <i className="fa-solid fa-thumbs-down text-blue-500 animate-shaking-like text-2xl"></i>
        </div>
      )}
    </Link>
  );
};
export default UserBar;
