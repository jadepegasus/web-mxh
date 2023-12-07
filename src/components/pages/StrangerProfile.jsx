import Cover from "./myprofile/Cover";
import Info from "./myprofile/Info";
import { useState, useEffect } from "react";
import Poster from "../homePage/Poster";
import ButtonFriend from "../friend/ButtonFriend";
import { host } from "../../env";

const StrangerProfile = ({ user_id, user_two_id }) => {
    const [user, setUser] = useState();
    const [posts, setPosts] = useState([])
    useEffect(() => {
      fetch(host+"/api/users/" + user_id, {credentials: 'include'})
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") setUser(data.data);
        });
    }, [user_id]);

    useEffect(() => {
          fetch(host+"/api/posts/user/" + user_id, {credentials: 'include'})
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 'success')
                setPosts(
                  data?.data?.sort((a, b) => {
                    return a.time < b.time ? 1 : -1;
                  })
                )

            }
            );
      }, [user_id]);

  if (user)
    return (
      <>
        <Cover user={user}  readonly={true}/>
        <ButtonFriend user_one_id={user_two_id}
        user_two_id={user_id}
        />
        <Info user={user}></Info> 
        {posts.map((post) => (
          <Poster
            key={post?._id}
            post={post}
            user={user}
            readonly={true}
          />
        ))}
        <div>{user?._id}</div>
      </>
    );
  return <div className="text-center mt-5 fw-bold">Không tìm được user</div>;
};

export default StrangerProfile;
