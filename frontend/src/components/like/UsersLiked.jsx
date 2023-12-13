import { useEffect, useRef } from "react";
import { useState } from "react";
import UserBar from "../homePage/header/UserBar";
import { host } from "../../env";

const UsersLiked = ({ close, post_id }) => {
  const [reacts, setReacts] = useState([]);
  const likeModal = useRef();
  const viewAll = useRef();
  useEffect(() => {
    viewAll.current.click();
    if (post_id) {
      fetch(host + "/api/likes/" + post_id, { credentials: "include" })
        .then((result) => result.json())
        .then((data) => {
          if (data.status === "success") {
            setReacts(data.data);
          }
        });
    }
  }, [post_id]);

  useEffect(() => likeModal.current.showModal());

  return (
    <dialog className="modal" id="editPostModal" ref={likeModal}>
      <div className="modal-box rounded-md">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-gray-200"
            onClick={close}
          >
            ✕
          </button>
        </form>
        <h1
          className="font-bold text-2xl text-center w-full"
          id="exampleModalLabel"
        >
          Xem người thích
        </h1>
        <div role="tablist" className="tabs tabs-bordered">
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="Tất cả"
            ref={viewAll}
          />
          <div role="tabpanel" className="tab-content pt-4">
            {reacts.map((react) => {
              return (
                <UserBar
                  key={react._id}
                  user={react.user}
                  react={react.type}
                ></UserBar>
              );
            })}
          </div>
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="Thích"
          />
          <div role="tabpanel" className="tab-content pt-4">
            {reacts
              .filter((e) => e.type === "like")
              .map((react) => {
                return (
                  <UserBar
                    key={react._id}
                    user={react.user}
                    react={react.type}
                  ></UserBar>
                );
              })}
          </div>

          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="Không thích"
          />
          <div role="tabpanel" className="tab-content pt-4">
            {reacts
              .filter((e) => e.type === "unlike")
              .map((react) => {
                return (
                  <UserBar
                    key={react._id}
                    user={react.user}
                    react={react.type}
                  ></UserBar>
                );
              })}
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop" onClick={close}>
        <button>close</button>
      </form>
    </dialog>
  );
};
export default UsersLiked;
