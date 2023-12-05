import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
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
  const [message, setMessage] = useState(false);

  useEffect(() => {
    function onNotify(notify) {
      setNumNotify(pre => (pre + 1))
      document.title = notify
    }
    socket.on("notify", onNotify);
    return () => {
      console.log('out socket')
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
      document.title = 'wel-come'

    }
    setNotification(!notification);
    setFriend(false);
  };
  const handleClickMessage = () => {
    if(!message) {
      setMessage(0);
    }
    setMessage(!message);
  };
  return (
    <div className="w-100" style={{ height: "56px" }}>
      <div
        className="shadow-sm position-fixed d-flex align-items-center p-1 justify-content-between w-100 bg-light z-3"
        style={{ fontSize: "2rem" }}
      >
        <div>
          <Link to="/">
            <button className="btn btn-light border rounded-circle fs-5 me-2 ms-3">
              <i className="fa-solid fa-house"></i>
            </button>
          </Link>

          <button
            className="btn btn-light border rounded-circle fs-5 me-2"
            onClick={handleOnSearch}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <div>
          <span className="postion-relative">
            <button
              className="btn btn-light border rounded-circle fs-5 me-2"
              onClick={handleClickFriend}
            >
              <i className="fa-solid fa-user-group"></i>
            </button>
            {friend && <FriendBoard />}
          </span>

          <span className="position-relative">
            <button className="btn btn-light border rounded-circle fs-5 me-2"
              onClick={handleClickMessage}
            >
              <i className="fa-brands fa-rocketchat"></i>
            </button>
            {message && <MessageBoard/>}
          </span>

          <span className="position-relative">
            <button
              className="btn btn-light border rounded-circle fs-5 me-2 position-relative"
              onClick={handleClickNotification}
            >
              <i className="fa-solid fa-bell"></i>
              {!(numNotify > 0) || (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {numNotify}+
                </span>
              )}
            </button>
            {notification && <NotificationBoard />}
          </span>

          <button className="btn btn-light border rounded-circle fs-5 me-3">
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>
      {search && <SearchBoard close={handleOnSearch} />}
    </div>
  );
};
export default Header;
