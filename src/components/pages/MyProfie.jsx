import { useState, useEffect } from "react";
import Poster from "../homePage/Poster";
import Status from "../homePage/Status";
import Cover from "./myprofile/Cover";
import Info from "./myprofile/Info";
import EditInfo from "./myprofile/EditInfo";
const MyProfile= () => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
      fetch("/api/users/myinfo")
        .then((res) => res.json())
        .then((data) => setUser(data));
    }, []);

    const editUser = (newUser) => {
      setUser(newUser)
    }
  
    const addPosts = (post) => {
      setPosts([post, ...posts]);
    };
  
    const deletePost = (post) => {
      setPosts(posts.filter((value) => value._id !== post._id));
    };
  
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
        <Cover user={user?.data}/>
        <Info user={user?.data}></Info>
        <EditInfo user={user?.data} editUser={editUser}></EditInfo>
        <Status user={user?.data} setPost={addPosts} />
        {posts.map((post) => (
          <Poster
            key={post?._id}
            post={post}
            user={user?.data}
            delete={deletePost}
          />
        ))}
      </div>
    );
  };

export default MyProfile