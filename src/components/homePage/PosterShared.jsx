import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { host } from "../../env";
import LikeCount from "../like/LikeCount";
import formatter from "../../unity/formatTime";

const PosterShared = ({ post_id }) => {
  const [poster, setPoster] = useState(null);

  useEffect(() => {
    if (post_id) {
      fetch(host + "/api/posts/" + post_id, { credentials: "include" })
        .then((result) => result.json())
        .then((data) => {
          if (data.status === "success") {
            setPoster(data.data);
          }
        });
    }
  }, [post_id]);

  if (!poster)
    return (
      <div className="p-2 text-center bg-gray-300 dark:bg-opacity-10">
        Bài viết đã bị xóa
      </div>
    );
  return (
    <div className="m-2 border rounded-md bg-gray-200 dark:bg-opacity-10">
      <div className="flex items-center justify-start px-4">
        <Link to={`/profile?id=${poster?.user._id}`}>
          <div className="avatar mt-4">
            <div className="w-10 rounded-full">
              <img
                alt="anh"
                src={
                  poster?.user?.user_picture
                    ? `${host}/api/images/${poster?.user?.user_picture}`
                    : `${host}/default_avatar.png`
                }
              />
            </div>
          </div>
        </Link>
        <div className="ms-2 mt-4">
          <div className="mb-0 font-semibold leading-3">
            {poster?.user?.user_fullname}
          </div>
          <div className="text-xs mt-1 text-gray-400">
            {poster?.time && formatter.format(new Date(poster?.time))}
          </div>
        </div>
      </div>
      <Link to={`/post?id=${post_id}`}>
        <div className="px-4">
          <p>{poster?.text}</p>
        </div>
        <div className="flex">
          {poster?.photos?.length === 0 ? (
            ""
          ) : poster?.photos?.length > 1 ? (
            <>
              <img
                src={`${host}/api/images/${poster?.photos[0]}`}
                alt="img-status"
                className="w-1/2 h-60 object-cover"
              />
              <div className="w-1/2 relative">
                {poster?.photos?.length === 2 || (
                  <>
                    <div className="absolute w-full h-full bg-[rgba(0,0,0,0.28)] top-0 left-0">
                      {" "}
                    </div>
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-2xl">
                      +{poster?.photos?.length - 2}
                    </span>
                  </>
                )}
                <img
                  src={`${host}/api/images/${poster?.photos[0]}`}
                  alt="img-status"
                  className="w-full object-cover h-60"
                />
              </div>
            </>
          ) : (
            <img
              src={`${host}/api/images/${poster?.photos[0]}`}
              alt="img-status"
              className="w-full h-96 object-cover"
            />
          )}
        </div>
      </Link>
      <div className="mx-2 ">
        <LikeCount
          like={poster?.likes}
          unlike={poster?.unlikes}
          comment={poster?.comments}
          share={poster?.shares}
          post_id={poster?._id}
        />
      </div>
    </div>
  );
};
export default PosterShared;
