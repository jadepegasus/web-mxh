import React from "react";
import PosterView from "../homePage/PosterView";
import { useLocation } from "react-router-dom";
import { host } from "../../env";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function PosterPage() {
  document.title = "Bài đăng";
  let post_id = useQuery().get("id");
  const [react, setReact] = React.useState("none");
  React.useEffect(() => {
    if (post_id)
      fetch(host + "/api/likes", {
        credentials: "include",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_id }),
      })
        .then((result) => result.json())
        .then((data) => {
          if (data?.data) {
            setReact(data.data?.type);
          }
        });
  }, [post_id]);

  return (
    <div>
      <PosterView
        post_id={post_id}
        close={e => {e.preventDefault()}}
        react={react}
        update={() => {}}
        setReact={setReact}
      ></PosterView>
    </div>
  );
}
