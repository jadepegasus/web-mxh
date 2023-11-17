import { Link } from "react-router-dom";
const Header = () => {
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

        <button className="btn btn-light border rounded-circle fs-5 me-2">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      <div>
        <button className="btn btn-light border rounded-circle fs-5 me-2">
          <i className="fa-solid fa-user-group"></i>
        </button>

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
    </div>
  );
};
export default Header;
