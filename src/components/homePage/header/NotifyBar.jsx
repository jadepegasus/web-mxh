import { Link } from "react-router-dom";
const NotifyBar = ({ notify, delNotify }) => {
    const handleDeleteNotify = () => {
        fetch("/api/notifications/delete/"+notify._id)
        .then((result) => result.json())
        .then((data) => {
          if (data.status === "success") delNotify(notify)
          else window.alert(data.message)
        });
    }

  return (
    <div className="d-flex justify-content-between">
      <Link to={notify?.url} className="text-decoration-none">
        <div className="btn btn-light w-100"
        >
          <div>
            <span>
            {notify?.action === "addfriend" && (
              <i className="fa-solid fa-user-plus"></i>
            )}

            </span>
            <span className="ms-2">{notify?.message}</span>
          </div>
          <small className="fs-7">{notify?.time}</small>
        </div>
      </Link>
      <button className="btn btn-light" onClick={handleDeleteNotify}><i className="fa-solid fa-trash"></i></button>

    </div>
  );
};
export default NotifyBar;
