import Status from "./Status";
import Poster from "./Poster";
import { useEffect, useState } from "react";
import Header from "./Header";
import { socket } from "../../socket";
import { host } from "../../env";
import ProfileSide from "../profileSide/profileSide";
import ChatSide from "../chatSide/chatSide"
const HomePage = () => {
  document.title = "Home Page";
  const [user, setUser] = useState();
  const [logined, setLogined] = useState(true);

  useEffect(() => {
    fetch(host + "/api/users/myinfo", { credentials: "include" })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUser(data);
        if (data.status === "fail") setLogined(false);
      });
  }, []);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user?.data?._id) {
      socket.emit("active", user.data._id);
    }
  }, [user]);

  useEffect(() => {
    if (user?.data) {
      fetch(host + "/api/posts", { credentials: "include" })
        .then((res) => res.json())
        .then((data) => {
          setPosts(
            data?.data?.sort((a, b) => {
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
  if (logined)
    return (
      <>
        <Header></Header>
        <div className="main bg-gray-500/10" style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "18rem auto 20rem",
          gap: "1rem",

        }}>
          <ProfileSide></ProfileSide>
          <div className="">
            <Status user={user?.data} setPost={addPosts} />
            {posts.map((post) => (
              <Poster
                key={post?._id}
                post={post}
                user={post.user}
                readonly={user?.data?._id !== post.user?._id}
                delete={deletePost}
              />
            ))}
          </div>
          <ChatSide></ChatSide>
        </div>
      </>
    );
  window.location.href = '/'
  return <></>
};
export default HomePage;
