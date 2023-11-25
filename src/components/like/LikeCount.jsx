import { useState } from "react";
import UsersLiked from "./UsersLiked";

const LikeCount = ({like, comment, share, unlike, post_id}) => {
  const [usersLiked, setUsersLiked] = useState(false);
  const closeUsersLiked = () => {
    setUsersLiked(false);
  };


  return (
    <div className="d-flex justify-content-between">
      <small style={{ cursor: "pointer" }}
      onClick={e => setUsersLiked(true)}
      >
        {like} thích, {unlike} không thích
      </small>
      <small>
        {comment} bình luận, {share} chia sẻ
      </small>
      {usersLiked && (
        <UsersLiked close={closeUsersLiked} post_id={post_id} />
      )}
    </div>
  );
};
export default LikeCount;
