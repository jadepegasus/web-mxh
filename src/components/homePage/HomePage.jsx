import Header from "./Header";
import Status from "./Status";
import Poster from "./Poster";
import { useEffect, useState } from "react";
import useFetch from "../../unity/useFetch";

const HomePage = () => {
  const [user] = useFetch("/api/users/myinfo");
  const [posts, setPosts] = useState([]);


  const addPosts = (post) => {
    setPosts([post, ...posts]);
  };

  const deletePost = (post) => {
    setPosts(posts.filter((value) => value._id !== post._id));
  };

  const updatePost = (post) => {
    const newPosts = posts.filter(value => value._id !== post._id)
    setPosts([post, ...newPosts])
  }

  useEffect(() => {
    if (user?.data) {
      fetch("api/posts/user/" + user.data._id)
        .then((res) => res.json())
        .then((data) =>
          setPosts(
            data.data.sort((a, b) => {
              return a.time < b.time ? 1 : -1;
            })
          )
        );
    }
  }, [user]);

  return (
    <div className="bg-secondary bg-opacity-10 pb-5">
      <Header />
      <Status user={user?.data} setPost={addPosts} />
      {posts.map((post) => (
        <Poster
          key={post?._id}
          post={post}
          user={user?.data}
          delete={deletePost}
          update={updatePost}
        />
      ))}
    </div>
  );
};
export default HomePage;
