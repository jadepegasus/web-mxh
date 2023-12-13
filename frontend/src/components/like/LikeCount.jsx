import { useState } from "react";
import UsersLiked from "./UsersLiked";

const LikeCount = ({ like, comment, share, unlike, post_id }) => {
  const [usersLiked, setUsersLiked] = useState(false);
  const closeUsersLiked = () => {
    setUsersLiked(false);
  };

  return (
    <div className="flex justify-between my-2">
      <div
        className="cursor-pointer"
        onClick={(e) => setUsersLiked(true)}
      >
        <div>
          <i className="hover:animate-shaking-like fa-solid fa-thumbs-up text-blue-500 text-xl"></i>
          <span className="ms-1 text-gray-500">{like} thích</span>
          <span className="ms-1 text-gray-500">, {unlike} không thích</span>
        </div>
      </div>
      <div className="text-gray-500">
        {comment} bình luận, {share} chia sẻ
      </div>
      {usersLiked && <UsersLiked close={closeUsersLiked} post_id={post_id} />}
    </div>
  );
};
export default LikeCount;
