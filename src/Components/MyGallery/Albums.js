import React from "react";
import "./index.css";
import MyAlbum from "./MyAlbum";

const Albums = ({ gallery }) => {
  return (
    <div className="conatiner1">
      {gallery.length > 0 ? (
        gallery.map((val, ind) => <MyAlbum data={val} key={ind} />)
      ) : (
        <p className="no-albums_text">No Albums Found</p>
      )}
    </div>
  );
};

export default Albums;
