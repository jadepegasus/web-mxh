import { Link } from "react-router-dom"
import { host } from "../../../env"
const UserBar = ({user, react}) => {
    return (
        <div>
            <Link to={`/profile?id=${user?._id}`} className="text-decoration-none">
                <div className="btn btn-light w-100 d-flex justify-content-between"
                >
                    <div>
                    <img src={user?.user_picture ? `${host}/api/images/${user?.user_picture}` : `${host}/default_avatar.png`}
                     alt="avatar"
                     width='36px'
                     height='36px'
                     className="rounded-circle"
                     />
                     <span className="ms-2">{user?.user_fullname}</span>

                    </div>
                    {
                        !react ? 
                        <div>{(user?.user_activated === 'on') ? <i className="fa-solid fa-earth-americas"></i> : <i className="fa-solid fa-power-off"></i>}</div> :
                        <div>{react==='like' ? <i className="fa-solid fa-thumbs-up"></i> : <i className="fa-solid fa-thumbs-down"></i>}</div>
                    }
                </div>
            </Link>
        </div>
    )
}
export default UserBar