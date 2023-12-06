import { useState } from "react";
import { host } from "../../env";

const active = {
  top: "-100%",
  transition: "opacity 1s ease-in-out",
  opacity: "1",
  width: "100%",
};
const unactive = {
  opacity: "0",
  pointerEvents: "none",
  height: "0",
  margin: "0",
  padding: "0",
  border: "0",
  overflow: "hidden",
};

const Like = ({ post_id, user_id, update, poster, react, setReact}) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleReact = async (type) => {
    setReact(type);
    if(type === 'like' && react === 'none') update({...poster, likes: poster?.likes+1})
    if(type === 'unlike' && react ==='none') update({...poster, unlikes: poster?.unlikes+1})
    if(type === 'unlike' && react ==='like') update({...poster, likes: poster?.likes-1, unlikes: poster?.unlikes+1})
    if(type === 'like' && react ==='unlike') update({...poster, likes: poster?.likes+1, unlikes: poster?.unlikes-1})


    await fetch(host+"/api/likes", {
      credentials: 'include',
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post_id, user_id }),
    });

    fetch(host+"/api/likes", {
      credentials: 'include',
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post_id, user_id, type }),
    });
  };

  const handleUnReact = () => {
    if(react === 'like') update({...poster, likes: poster?.likes-1})
    if(react === 'unlike') update({...poster, unlikes: poster?.unlikes-1})

    setReact("none");
    fetch(host+"/api/likes", {
      credentials: 'include',
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post_id, user_id }),
    });
  };

  return (
    <div className="col">
      <div
        className="btn btn-light w-100 position-relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleUnReact}
      >
        {react === "none" && (
          <span className="me-2">
            <i className="fa-regular fa-thumbs-up"></i>
            Thích
          </span>
        )}
        {react === "like" && (
          <span className="me-2  text-nowrap">
            <i className="fa-solid fa-thumbs-up"></i>
            Đã thích
          </span>
        )}
        {react === "unlike" && (
          <span className="me-2  text-nowrap">
            <i className="fa-solid fa-thumbs-down"></i>
            Đã không thích
          </span>
        )}
        <div
          className="position-absolute"
          style={isHovered ? active : unactive}
        >
          <button
            className="btn btn-light w-50"
            onClick={(e) => {
              e.stopPropagation();
              handleReact("like");
            }}
          >
            <span className="me-2">
              <i className="fa-solid fa-thumbs-up"></i>
            </span>
          </button>
          <button
            className="btn btn-light w-50"
            onClick={(e) => {
              e.stopPropagation();
              handleReact("unlike");
            }}
          >
            <span className="me-2">
              <i className="fa-solid fa-thumbs-down"></i>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Like;
