import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import SearchBoard from "./header/SearchBoard";
import FriendBoard from "./header/FriendBoard";
import NotificationBoard from "./header/NotificationBoard";
import { socket } from "../../socket";
import MessageBoard from "./header/MessageBoard";

const Header = () => {
  const [search, setSearch] = useState(false);
  const [friend, setFriend] = useState(false);
  const [notification, setNotification] = useState(false);
  const [numNotify, setNumNotify] = useState(0);
  const notifyToast = useRef()
  const [message, setMessage] = useState(false);

  useEffect(() => {
    function onNotify(notify) {
      setNumNotify((pre) => pre + 1);
      document.title = notify;
      document.getElementById('notifyMessage').innerHTML = notify
      showNotify()
    }
    socket.on("notify", onNotify);
    return () => {
      console.log("out socket");
      socket.off("notify", onNotify);
    };
  }, []);

  const handleOnSearch = () => {
    setSearch(!search);
  };
  const handleClickFriend = () => {
    setFriend(!friend);
    setNotification(false);
  };
  const handleClickNotification = () => {
    if (!notification) {
      setNumNotify(0);
      document.title = "wel-come";
    }
    setNotification(!notification);
    setFriend(false);
  };

  const logout = () => {
    fetch("/logout")
      .then((result) => result.json())
      .then((data) => {
        if (data.status === "success") window.location.href = "/";
      });
  };

  const showNotify = () => {
    notifyToast.current?.classList?.remove("opacity-0");
    setTimeout(() => {
      notifyToast.current?.classList.add("opacity-0");
    }, 4000);
  };

  const handleClickMessage = () => {
    if(!message) {
      setMessage(0);
    }
    setMessage(!message);
  };
  return (
    <div className="h-14">
      <div className="navbar bg-base-100 fixed shadow-sm">
        <div className="flex-1">
          <Link to="/">
            <button className="btn btn-ghost text-xl bg-gray-200 rounded-full w-12">
              <i className="fa-solid fa-house"></i>
            </button>
          </Link>
          <a
            className="btn btn-ghost text-xl bg-gray-200 rounded-full w-12 mx-2"
            onClick={handleOnSearch}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </a>
        </div>

        <div className="flex-none">
          <a
            className="btn btn-ghost text-xl bg-gray-200 rounded-full w-12 relative"
            onClick={handleClickFriend}
          >
            <i className="fa-solid fa-user-group"></i>
            {friend && <FriendBoard />}
          </a>

          <a className="btn btn-ghost text-xl bg-gray-200 rounded-full w-12 mx-2 relative" 
            onClick={handleClickMessage}
          >
            <i className="fa-brands fa-rocketchat"></i>
            {message && <MessageBoard/>}
          </a>

          <a
            className="btn btn-ghost text-xl bg-gray-200 rounded-full w-12 me-2 relative"
            onClick={handleClickNotification}
          >
            {!(numNotify > 0) || (
              <div className="badge badge-primary badge-sm !absolute -end-3 !-top-1 animate-pulse bg-red-500 border-none">
                +{numNotify}
              </div>
            )}
            <i className="fa-solid fa-bell"></i>
            {notification && <NotificationBoard />}
          </a>

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn w-12 rounded-full">
              <i className="fa-solid fa-bars"></i>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Cài đặt </a>
              </li>
              <li onClick={(e) => logout()}>
                <a>Đăng xuất</a>
              </li>
            </ul>
          </div>
        </div>
        {search && <SearchBoard close={handleOnSearch} />}
      </div>
      <div ref={notifyToast} className="toast toast-end pointer-events-none transition ease-in-out duration-1000 bottom-0 right-0 opacity-0">
        <div className="alert alert-info">
          <span id='notifyMessage'>New mail arrived.</span>
        </div>
      </div>
    </div>
  );
};
export default Header;
