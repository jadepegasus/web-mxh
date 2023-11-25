import { useEffect, useState } from "react";

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

const Like = ({ post_id, user_id, set_like, like }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [react, setReact] = useState("none");
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    if (post_id) {
      fetch("/api/likes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_id, user_id }),
      })
        .then((result) => result.json())
        .then((data) => {
          if (data?.data) {
            setReact(data.data?.type);
          }
        });
    }
  }, [post_id, user_id]);

  const handleReact = async (type) => {
    setReact(type);
    if(type === 'like' && react === 'none') set_like({...like, likes: like.likes+1})
    if(type === 'unlike' && react ==='none') set_like({...like, unlikes: like.unlikes+1})
    if(type === 'unlike' && react ==='like') set_like({unlikes: like.unlikes+1, likes: like.likes-1})
    if(type === 'like' && react ==='unlike') set_like({unlikes: like.unlikes -1, likes: like.likes+1})


    await fetch("/api/likes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post_id, user_id }),
    });

    fetch("/api/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post_id, user_id, type }),
    });
  };

  const handleUnReact = () => {
    if(react === 'like') set_like({...like, likes: like.likes-1})
    if(react === 'unlike') set_like({...like, unlikes: like.unlikes-1})

    setReact("none");
    fetch("/api/likes", {
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
          <span className="me-2">
            <i className="fa-solid fa-thumbs-up"></i>
            Đã thích
          </span>
        )}
        {react === "unlike" && (
          <span className="me-2">
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
