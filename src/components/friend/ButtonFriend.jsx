import { useState } from "react";
import { useEffect } from "react";
import { socket } from "../../socket";
import { host } from "../../env";

const ButtonFriend = ({ user_one_id, user_two_id }) => {
  const [status, setStatus] = useState();
  const handleAddFriend = () => {
    if (window.confirm("xác nhận kết bạn")) {
      fetch(host + "/api/friends", {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_one_id, user_two_id }),
      })
        .then((result) => result.json())
        .then((data) => {
          if (data.status === "success") {
            setStatus("2");
            socket.emit("notify", {
              user_one_id,
              user_two_id,
              message: "bạn vừa có thêm 1 bạn bè",
            });
          } else alert(data.message);
        });
    }
  };

  const handleDeleteFriend = () => {
    if (window.confirm("xác nhận hủy kết bạn")) {
      fetch(host + "/api/friends/delete", {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_one_id, user_two_id }),
      })
        .then((result) => result.json())
        .then((data) => {
          if (data.status === "success") setStatus("3");
          else alert(data.message);
        });
    }
  };

  useEffect(() => {
    if (user_one_id && user_two_id) {
      fetch(host + "/api/friends/check", {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_one_id, user_two_id }),
      })
        .then((result) => result.json())
        .then((data) => {
          if (data.status === "success") setStatus(data.message);
        });
    }
  }, [user_one_id, user_two_id]);

  return (
    <div>
      {status === "3" ? (
        <button
          className="btn btn-primary"
          onClick={handleAddFriend}
        >
          Thêm bạn
        </button>
      ) : status === "2" ? (
        <button
          className="btn btn-primary"
          onClick={handleDeleteFriend}
        >
          Hủy kết bạn
        </button>
      ) : (
        <button className="btn" disabled>
          Chưa đăng nhập
        </button>
      )}
    </div>
  );
};
export default ButtonFriend;
