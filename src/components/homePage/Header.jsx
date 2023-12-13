import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import SearchBoard from "./header/SearchBoard";
import FriendBoard from "./header/FriendBoard";
import NotificationBoard from "./header/NotificationBoard";
import { socket } from "../../socket";
import MessageBoard from "./header/MessageBoard";
import { host } from "../../env";
import ImageView from "../image/ImageView";

const Header = () => {
  const [search, setSearch] = useState(false);
  const [friend, setFriend] = useState(false);
  const [notification, setNotification] = useState(false);
  const [numNotify, setNumNotify] = useState(0);
  const notifyToast = useRef();
  const [message, setMessage] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  useEffect(() => {
    function onNotify(notify) {
      setNumNotify((pre) => pre + 1);
      document.title = notify;
      document.getElementById("notifyMessage").innerHTML = notify;
      showNotify();
    }
    function onNewMessage(notify) {
      document.title = "new message!";
      setHasNewMessage(true);
      document.getElementById("notifyMessage").innerHTML = notify;
      showNotify();
    }
    socket.on("notify", onNotify);
    socket.on("newmessage", onNewMessage);
    return () => {
      console.log("out socket");
      socket.off("notify", onNotify);
      socket.off("newmessage", onNewMessage);
    };
  }, []);

  const handleOnSearch = () => {
    setSearch(!search);
    setFriend(false)
    setNotification(false)
    // setMessage(false)
  };
  const handleClickFriend = () => {
    setFriend(!friend);
    setNotification(false);
    setMessage(false)
    setSearch(false)
  };
  const handleClickNotification = () => {
    if (!notification) {
      setNumNotify(0);
      document.title = "wel-come";
    }
    setNotification(!notification);
    setFriend(false);
    setMessage(false)
    setSearch(false)
  };

  const logout = () => {
    fetch(host + "/logout", { credentials: "include" })
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
    if (!message) {
      setMessage(0);
    }
    setMessage(!message);
    if (hasNewMessage) {
      setHasNewMessage(false);
      document.title = "wel-come";
    }
    setNotification(false)
    setFriend(false)
    setSearch(false)
  };
  return (
    <>
      <ImageView></ImageView>
      <div className="h-14">
        <div className="navbar bg-base-100 fixed shadow-sm z-40">
          <div className="flex-1">
            <Link to="/homepage">
              <button className="btn btn-ghost text-xl bg-gray-200 rounded-full w-12">
                <i className="fa-solid fa-house hover:animate-shaking-like"></i>
              </button>
            </Link>
            <button
              className="btn btn-ghost text-xl bg-gray-200 rounded-full w-12 mx-2"
              onClick={handleOnSearch}
            >
              <i className="fa-solid fa-magnifying-glass hover:animate-shaking-like"></i>
            </button>
          </div>

          <div className="flex-none">
            <div className="relative">
              <button
                className="btn btn-ghost text-xl bg-gray-200 rounded-full w-12"
                onClick={handleClickFriend}
              >
                <i className="fa-solid fa-user-group hover:animate-shaking-like"></i>
              </button>
              {friend && <FriendBoard />}
            </div>
            <div className="relative">
              <button
                className="btn btn-ghost text-xl bg-gray-200 rounded-full w-12 mx-2 relative"
                onClick={handleClickMessage}
              >
                {hasNewMessage && (
                  <div className="badge badge-primary badge-sm !absolute !-top-1 animate-ping">
                  </div>
                )}
                <i className="fa-brands fa-rocketchat hover:animate-shaking-like"></i>
              </button>
              {message && <MessageBoard />}
            </div>

            <div className="relative">
              <button
                className="btn btn-ghost text-xl bg-gray-200 rounded-full w-12 me-2"
                onClick={handleClickNotification}
              >
                {!(numNotify > 0) || (
                  <div className="badge badge-primary badge-sm !absolute -end-3 !-top-1 animate-pulse bg-red-500 border-none z-50">
                    +{numNotify}
                  </div>
                )}
                <i className="fa-solid fa-bell hover:animate-shaking-like"></i>
              </button>
              {notification && <NotificationBoard />}
            </div>

            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn w-12 rounded-full">
                <i className="fa-solid fa-bars hover:animate-shaking-like"></i>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <button>Cài đặt </button>
                </li>
                <li onClick={(e) => logout()}>
                  <button>Đăng xuất</button>
                </li>
              </ul>
            </div>
          </div>
          {search && <SearchBoard close={handleOnSearch} />}
        </div>
        <div
          ref={notifyToast}
          className="toast toast-end pointer-events-none transition ease-in-out duration-1000 bottom-0 right-0 opacity-0 z-50"
        >
          <div className="alert alert-info">
            <span id="notifyMessage">New mail arrived.</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
