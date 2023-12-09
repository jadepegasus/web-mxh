import { useRef, useEffect, useState } from "react";
import UserBar from "./UserBar";
import { host } from "../../../env";
const SearchBoard = ({ close }) => {
  const [text, setText] = useState("");
  const [users, setUsers] = useState([]);
  const input = useRef(null);
  useEffect(() => {
    input.current.focus();
  }, []);
  useEffect(() => {
    if (text.length > 1) {
      fetch(host + "/api/users/search?search=" + text, {
        credentials: "include",
      })
        .then((result) => result.json())
        .then((data) => {
          if (data.status === "success") setUsers(data.data);
        });
    } else setUsers([]);
  }, [text]);
  return (
    <div className="fixed top-0 start-0 z-50 pt-2 pe-3 shadow-sm rounded-md bg-white block">
      <div className="pb-2">
        <button className="btn ms-2 me-1 rounded-full" onClick={close}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <input
          ref={input}
          type="text"
          placeholder="Nhập tên hoặc email"
          className="border rounded-full p-2"
          style={{ outline: "none" }}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div>
        {users.length > 0 ? (
          users.map((user) => {
            return <UserBar user={user} key={user._id}></UserBar>;
          })
        ) : (
          <div className="text-center pb-3"> Không tìm thấy</div>
        )}
      </div>
    </div>
  );
};

export default SearchBoard;
