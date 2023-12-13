import { useEffect, useRef, useState } from "react";

export default function ImageView() {
  const image = useRef();

  return (
    <dialog id="modal_image_view" className="modal">
      <form method="dialog">
        <button className="btn btn-sm btn-circle fixed right-0 top-0 z-50">
          ✕
        </button>
      </form>
      <div className="modal-box max-w-full p-0 max-h-screen bg-black rounded-none">
        <div className="flex justify-center">
          <img
            ref={image}
            id="image_display"
            src="/"
            alt="imageView"
            className="max-w-screen"
          />
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
