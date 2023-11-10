const Header = () => {
  return (
    <div
      className="header-component shadow-sm position-fixed d-flex flex-row w-100 pe-3 ps-3 bg-light border"
      style={{fontSize:"2rem"}}
    >
      <div className="logo-home me-5 ms-3">
        <i className="fa-solid fa-house"></i>
      </div>
      <div className="search-component me-auto">
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <div className="friend-component d-inline-block">
        <i className="fa-solid fa-user-group"></i>
      </div>
      <div className="chat-component ms-5">
        <i className="fa-brands fa-rocketchat"></i>
      </div>
      <div className="notify-component ms-5">
        <i className="fa-solid fa-bell"></i>
      </div>
      <div className="setting-component ms-5 me-3">
        <i className="fa-solid fa-bars"></i>
      </div>
    </div>
  );
};
export default Header;
