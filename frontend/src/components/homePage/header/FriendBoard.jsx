import { useEffect, useState } from "react";
import UserBar from "./UserBar";
import { host } from "../../../env";
const FriendBoard = ({ close }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetch(host + "/api/friends/getfriends", { credentials: "include" })
      .then((result) => result.json())
      .then((data) => {
        if (data.status === "success")
          setFriends(
            data.data.sort((a, b) => {
              return a.date < b.date ? 1 : -1;
            })
          );
      });
  }, []);
  return (
    <div className="p-3 shadow-sm border rounded-md absolute top-12 right-1/2 translate-x-1/2 bg-white min-w-[18rem] sm:right-0 sm:translate-x-0">
      <div className="text-center text-xl text-w">Danh sách bạn bè</div>
      <hr></hr>

      {friends.length > 0 ? (
        friends.map((user) => {
          return <UserBar user={user} key={user._id}></UserBar>;
        })
      ) : (
        <div className="text-center fs-6">Bạn chưa kết bạn với ai</div>
      )}
    </div>
  );
};

export default FriendBoard;
