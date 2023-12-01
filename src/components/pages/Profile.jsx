import React from "react";
import { useLocation } from "react-router-dom";
import MyProfile from "./MyProfie";
import Header from "../homePage/Header";
import StrangerProfile from "./StrangerProfile";
import { useState, useEffect } from "react";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Profile = () => {
  let query = useQuery();
  const [dataLogin, setDataLogin] = useState()
  useEffect(() => {
    fetch('/logined')
      .then(res => {
        return res.json()
      })
      .then(data => {
        if (data.status === 'success')
          setDataLogin(data)
      })
  }, [])
  return (
    <>
      <Header />
      {dataLogin?.message?.user_id === query.get("id") ? (
        <MyProfile />
      ) : (
        <StrangerProfile user_id={query.get('id')}
        user_two_id={dataLogin?.message?.user_id}
        />
      )}
    </>
  );
};

export default Profile;
