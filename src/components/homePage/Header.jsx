import { Link } from "react-router-dom";
import { useState } from "react";
import SearchBoard from "./header/SearchBoard";
import FriendBoard from "./header/FriendBoard";
const Header = () => {
  const [search, setSearch] = useState(false)
  const [friend, setFriend] = useState(false) 
  const handleOnSearch = () => {
    setSearch(!search)
  }
  const handleClickFriend = () => {
    setFriend(!friend)
  }
  return (
    <div className="w-100"
    style={{height:'56px'}}>

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

        <button className="btn btn-light border rounded-circle fs-5 me-2" onClick={handleOnSearch}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      <div>
        <span className="postion-relative">
          <button className="btn btn-light border rounded-circle fs-5 me-2" onClick={handleClickFriend}>
            <i className="fa-solid fa-user-group"></i>
          </button>
          {friend && <FriendBoard />}
        </span>

        <button className="btn btn-light border rounded-circle fs-5 me-2">
          <i className="fa-brands fa-rocketchat"></i>
        </button>

        <button className="btn btn-light border rounded-circle fs-5 me-2">
          <i className="fa-solid fa-bell"></i>
        </button>

        <button className="btn btn-light border rounded-circle fs-5 me-3">
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
    </div>
    {search && <SearchBoard close={handleOnSearch}/>}
      
    </div>
  );
};
export default Header;
