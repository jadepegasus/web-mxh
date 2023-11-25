import Status from "./Status";
import Poster from "./Poster";
import { useEffect, useState } from "react";
import useFetch from "../../unity/useFetch";
import Header from "./Header";
import { socket } from "../../socket";

const HomePage = () => {
  const [user] = useFetch("/api/users/myinfo");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user?.data?._id) {
      socket.emit("active", user.data._id);
    }
  }, [user]);

  useEffect(() => {
    if (user?.data) {
      fetch("api/posts")
        .then((res) => res.json())
        .then((data) => {
          setPosts(
            data.data.sort((a, b) => {
              return a.time < b.time ? 1 : -1;
            })
          );
        });
    }
  }, [user]);

  const addPosts = (post) => {
    setPosts([post, ...posts]);
  };

  const deletePost = (post) => {
    setPosts(posts.filter((value) => value._id !== post._id));
  };

  return (
    <>
      <Header></Header>
      <div className="bg-secondary bg-opacity-10 pb-5">
        <Status user={user?.data} setPost={addPosts} />
        {posts.map((post) => (
          <Poster
            key={post?._id}
            post={post}
            user={post.user}
            readonly={(user?.data?._id !== post.user?._id)}
            delete={deletePost}
          />
        ))}
      </div>
    </>
  );
};
export default HomePage;
