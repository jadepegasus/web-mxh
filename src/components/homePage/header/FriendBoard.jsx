import { useEffect, useState } from "react";
import UserBar from "./UserBar";
const FriendBoard = ({ close }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
      fetch("/api/friends/getfriends")
        .then((result) => result.json())
        .then((data) => {
          if (data.status === "success") setFriends(data.data.sort((a, b) => {
            return a.date < b.date ? 1 : -1;
          }));
        });
  }, []);
  return (
    <div
      className="position-absolute z-3 p-3 shadow rounded-2"
      style={{ backgroundColor: "white", right:'120px' }}
    >
      <div className="text-center fs-4">
        Danh sách bạn bè
      </div>
      <hr></hr>

        {friends.length > 0 ?  friends.map(user => {
            return <UserBar user={user} key={user._id}></UserBar>
        }) : 
        <div className="text-center fs-6">Bạn chưa kết bạn với ai</div>
        }

    </div>
  );
};

export default FriendBoard;
