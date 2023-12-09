import { useRef } from "react";
import { host } from "../../env";

const Like = ({ post_id, user_id, update, poster, react, setReact }) => {
  const reactIcon = useRef()

  const handleReact = async (type) => {
    setReact(type);
    if (type === "like" && react === "none")
      update({ ...poster, likes: poster?.likes + 1 });
    if (type === "unlike" && react === "none")
      update({ ...poster, unlikes: poster?.unlikes + 1 });
    if (type === "unlike" && react === "like")
      update({
        ...poster,
        likes: poster?.likes - 1,
        unlikes: poster?.unlikes + 1,
      });
    if (type === "like" && react === "unlike")
      update({
        ...poster,
        likes: poster?.likes + 1,
        unlikes: poster?.unlikes - 1,
      });

    await fetch(host + "/api/likes", {
      credentials: "include",
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post_id, user_id }),
    });

    fetch(host + "/api/likes", {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post_id, user_id, type }),
    });
  };

  const handleUnReact = () => {
    if (react === "like") update({ ...poster, likes: poster?.likes - 1 });
    if (react === "unlike") update({ ...poster, unlikes: poster?.unlikes - 1 });

    setReact("none");
    fetch(host + "/api/likes", {
      credentials: "include",
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post_id, user_id }),
    });
  };

  return (
    <div
      className="btn w-full my-1 bg-transparent border-none shadow-none hover:bg-gray-100 relative hover:text-blue-500 group"
      onMouseEnter={e => {reactIcon.current?.classList?.remove('hidden')}}
      onMouseLeave={e => {reactIcon.current?.classList?.add('hidden')}}
      onClick={handleUnReact}
    >
      {react === "none" && (
        <>
          <span className="group-hover:animate-shaking-like 3xl:text-[30px] text-[calc(30px/6*5)]">
            <i className="fa-regular fa-thumbs-up"></i>
          </span>
          <span>Thích</span>
        </>
      )}
      {react === "like" && (
        <>
          <span className="group-hover:animate-shaking-like 3xl:text-[30px] text-[calc(30px/6*5)] text-blue-500">
            <i className="fa-solid fa-thumbs-up"></i>
          </span>
          <span className="text-blue-500">Đã thích</span>
        </>
      )}
      {react === "unlike" && (
        <>
          <span className="group-hover:animate-shaking-like 3xl:text-[30px] text-[calc(30px/6*5)] text-blue-500">
            <i className="fa-solid fa-thumbs-down"></i>
          </span>
          <span className="text-blue-500">Không thích</span>
        </>
      )}
      <div className="bg-white 3xl:h-[42px] h-[calc(42px/6*5)] border-blue-500 border-[1px] rounded-[10px] 3xl:w-[238px] w-[calc(238px/6*5)] px-3 z-10 absolute -translate-y-full justify-center animate-slip-to-top hidden"
      ref={reactIcon}
      >
        <div className="flex flex-row items-center h-full w-full justify-evenly">
          <div
            className="transition-all ease-linear hover:scale-[1.75] 3xl:text-[30px] text-[calc(30px/6*5)] text-blue-500"
            onClick={(e) => {
              e.stopPropagation()
              handleReact("like");
              reactIcon.current?.classList?.add('hidden')
            }}
          >
            <i className="fa-solid fa-thumbs-up"></i>
          </div>
          <div
            className="transition-all ease-linear hover:scale-[1.75] 3xl:text-[30px] text-[calc(30px/6*5)] text-blue-500"
            onClick={(e) => {
              e.stopPropagation()
              handleReact("unlike");
              reactIcon.current?.classList?.add('hidden')
            }}
          >
            <i className="fa-solid fa-thumbs-down"></i>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Like;
