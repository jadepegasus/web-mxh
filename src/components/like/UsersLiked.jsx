import { useEffect } from "react";
import { useState } from "react";
import UserBar from "../homePage/header/UserBar";
import { host } from "../../env";

const UsersLiked = ({close, post_id}) => {
    const [reacts, setReacts] = useState([]);
    const [reactsFilter, setReactsFilter] = useState([])
    useEffect(() => {
        document.querySelector('button.nav-link').classList.add('active')
        if (post_id) {
            fetch(host+'/api/likes/' + post_id, {credentials: 'include'})
                .then(result => result.json())
                .then(data => {
                    if (data.status==='success') {
                        setReacts(data.data)
                        setReactsFilter(data.data)
                    }
                })
        }
    },[post_id])

    const handleClickAll = (e) => {
        document.querySelectorAll('button.nav-link').forEach(element => {
            element.classList.remove('active')
        })
        e.target.classList.add('active')
        setReactsFilter(reacts)
    }
    const handleClickLike = (e) => {
        document.querySelectorAll('button.nav-link').forEach(element => {
            element.classList.remove('active')
        })
        e.target.classList.add('active')
        setReactsFilter(reacts.filter(e => e.type==='like'))
    }
    const handleClickUnlike = (e) => {
        document.querySelectorAll('button.nav-link').forEach(element => {
            element.classList.remove('active')
        })
        e.target.classList.add('active')
        setReactsFilter(reacts.filter(e => e.type ==='unlike'))
    }

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 z-3 bg-secondary bg-opacity-50"
    onClick={close}
    >
      <div
        className="position-absolute start-50 translate-middle-x bg-light rounded-4"
        style={{
          maxWidth: "90%",
          width: "540px",
          overflowY: "auto",
          maxHeight: "70vh",
          top: '25%'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div className="text-center pt-3">
          <button
            type="button"
            className="btn-close float-end"
            aria-label="Close"
            onClick={close}
          ></button>
            <ul className="nav nav-tabs">
            <li className="nav-item">
                <button className="nav-link" onClick={handleClickAll}>Tất cả</button>
            </li>
            <li className="nav-item">
                <button className="nav-link" onClick={handleClickLike}>Thích</button>
            </li>
            <li className="nav-item">
                <button className="nav-link" onClick={handleClickUnlike}>Không thích</button>
            </li>
            </ul>
            {reactsFilter.map(react => {
                return <UserBar key={react._id} user={react.user} react={react.type}></UserBar>
            })}
        </div>
      </div>
    </div>
  );
};
export default UsersLiked;
