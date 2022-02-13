import React from "react";
import { Redirect } from "react-router-dom";

const spotifyLogin = () => {
  const LoginSpotify = () => {
    <Redirect to="/home" />;
  };

  return (
    <input
      type="button"
      value="LoginSpotify"
      onClick={LoginSpotify}
      className="botonSpotify"
    />
  );
};

export default spotifyLogin;
