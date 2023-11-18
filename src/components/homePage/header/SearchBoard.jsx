import { useRef, useEffect, useState } from "react";
import UserBar from "./UserBar";
const SearchBoard = ({ close }) => {
  const [text, setText] = useState("");
  const [users, setUsers] = useState([]);
  const input = useRef(null);
  useEffect(() => {
    input.current.focus();
  }, []);
  useEffect(() => {
    if (text.length > 1) {
      fetch("/api/users/search?search=" + text)
        .then((result) => result.json())
        .then((data) => {
          if (data.status === "success") setUsers(data.data);
        });
    } else setUsers([])
  }, [text]);
  return (
    <div
      className="position-fixed top-0 start-0 z-3 pt-2 pe-3 shadow rounded-2"
      style={{ backgroundColor: "white" }}
    >
      <div className="pb-2">
        <button
          className="btn btn-light ms-2 me-1 rounded-circle"
          onClick={close}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <input
          ref={input}
          type="text"
          placeholder="Nhập tên hoặc email"
          className="border rounded-pill p-2"
          style={{ outline: "none" }}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

        {users.length > 0 ?  users.map(user => {
            return <UserBar user={user} key={user._id}></UserBar>
        }) : 
        <div className="text-center pb-3"> Không tìm thấy</div>
        }

    </div>
  );
};

export default SearchBoard;
