import { useState } from "react";
import { useEffect } from "react";
import { socket } from "../../socket";
import { host } from "../../env";

const ButtonFriend = ({ user_one_id, user_two_id }) => {
  const [status, setStatus] = useState();
  const handleAddFriend = () => {
    if (window.confirm("xác nhận kết bạn")) {
      fetch(host+"/api/friends", {
        credentials: 'include',
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_one_id, user_two_id }),
      })
        .then((result) => result.json())
        .then((data) => {
          if (data.status === "success") {
            setStatus("2");
            socket.emit("notify", { user_one_id, user_two_id, message: 'bạn vừa có thêm 1 bạn bè' });
          } else alert(data.message);
        });
    }
  };

  const handleDeleteFriend = () => {
    if (window.confirm("xác nhận hủy kết bạn")) {
      fetch(host+"/api/friends/delete", {
        credentials: 'include',
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
      fetch(host+"/api/friends/check", {
        credentials: 'include',
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
  if (status === "3") {
    return (
      <div className="positon-relative">
        <button
          className="btn btn-primary end-50 position-absolute"
          onClick={handleAddFriend}
        >
          Thêm bạn
        </button>
      </div>
    );
  }

  if (status === "2") {
    return (
      <div className="positon-relative">
        <button
          className="btn btn-primary end-50 position-absolute"
          onClick={handleDeleteFriend}
        >
          Hủy kết bạn
        </button>
      </div>
    );
  }
  return (
    <div className="positon-relative">
      <button className="btn btn-primary end-50 position-absolute" disabled>
        Chưa đăng nhập
      </button>
    </div>
  );
};
export default ButtonFriend;
