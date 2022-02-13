import React from "react";
import FrameStyle from "./FrameStyle.css";

const Frame = () => {
  const playlist = sessionStorage.getItem("playlistId");
  console.log("playlist id para el fram", playlist);
  const url = `https://open.spotify.com/embed/playlist/${playlist}?utm_source=generator`;

  return (
    <div className="FrameDiv">
      <iframe className="Frame" src={url} allow="encrypted-media"> </iframe>
    </div>
  );
};

export default Frame;
