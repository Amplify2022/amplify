import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AuthHandlerEstilos from "./AuthHandlerEstilos.css";
import Playlist from "./Playlist";
import Frame from "./Frame";
import spotify_search from "./spotify_search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import MusicSearch from "./MusicSearch";

export const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "9b8d493c362e4885839078aa7b59eb69";
const client_secret = "5258e52db2a2481c90d5c0fc86e42554";
const redirectUri = "http://localhost:3000/home";
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-modify-playback-state",
  "playlist-modify-public",
  "playlist-modify-private",
];
const base64credentials = Buffer.from(clientId + ":" + client_secret).toString(
  "base64"
);

const hash = window.location.href;
const code = hash.split("=")[1];

const AuthHandler = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const text = useRef("");
  const token = sessionStorage.getItem("bearer");
  const authToken = sessionStorage.getItem("token");
  const rut = sessionStorage.getItem("rut");
  const barName = useSelector((state) => state.barName);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [access_token, setAccess_token] = useState("");
  const [refresh_token, setRefresh_token] = useState("");

  useEffect(() => {
    console.log("Llegue al fetch del token");
    var formBody = [];
    var dataToSend = `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`;

    fetch(`https://accounts.spotify.com/api/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${base64credentials}`,
      },
      body: dataToSend,
    })
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([data, statusCode]);
      })
      .then((data) => {
        if (data[1] == 200) {
          console.log(data[0]);
          setAccess_token(data[0].access_token);
          setRefresh_token(data[0].refresh_token);
          dispatch({
            type: "AUTH_TOKEN",
            payload: { authToken: access_token },
          });
          saveTokenInBackEnd(data[0].access_token, rut, data[0].refresh_token);
        }
      });
  }, []);

  function isEmpty(value) {
    var logTitle = "isEmpty";
    try {
      if (value == null || value == "" || !value || value == "undefined") {
        return true;
      }
      return false;
    } catch (error) {
      console.log(logTitle, error);
    }
  }

  function saveTokenInBackEnd(token, rut, refresh_token) {
    let dataToSend = {
      barRut: rut,
      token: token,
      refresh_token: refresh_token,
    };
    console.log("data to send for saving the token", dataToSend);
    let formBody = JSON.stringify(dataToSend);
    fetch(
      `http://Amplify-env.eba-gfgbyjuc.us-east-1.elasticbeanstalk.com/bars/token`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: formBody,
      }
    )
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([data, statusCode]);
      })
      .then((data, statusCode) => {
        if (data[1] === 200) {
          console.log("se guardo el token en back con exito");
          sessionStorage.setItem("token", token);
          console.log("token --  ", token);
          getDevices(token);
        } else {
          console.log("no se pudo guardar el token", data[0]);
        }
      });
  }

  function getDevices(token) {
    fetch(`https://api.spotify.com/v1/me/player/devices`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([data, statusCode]);
      })
      .then((data, statusCode) => {
        if (data[1] === 200) {
          console.log("obtuve los devices", data[0].devices);
          const allDevices = data[0].devices;
          if (!isEmpty(allDevices)) {
            var deviceID = "";
            for (var i = 0; i < allDevices.length; i++) {
              if (allDevices[i].is_active) {
                console.log("el device que esta sonando", allDevices[i].id);
                deviceID = allDevices[i].id;
                dispatch({ type: "DEVICE", payload: { deviceID: deviceID } });
                sessionStorage.setItem("device", deviceID);
                saveDeviceInBackEnd(deviceID);
              }
            }
            if (isEmpty(deviceID)) {
              console.log(
                "no hay device reproduciento seteo el primero",
                allDevices[0].id
              );
              dispatch({
                type: "DEVICE",
                payload: { deviceID: allDevices[0].id },
              });
              sessionStorage.setItem("device", allDevices[0].id);

              saveDeviceInBackEnd(allDevices[0].id);
            }
            console.log("lista de devices", allDevices);
          }
          else {
            alert("Por favor, ingrese a Spotify antes de sincronizar su cuenta")
          }
        } else {
          console.log(data[0]);
        }
      });

    function saveDeviceInBackEnd(device) {
      var rut = sessionStorage.getItem("rut");
      console.log("rut a guardar", rut);
      console.log("device a pasar", device);
      let dataToSend = {
        deviceID: device,
      };
      let formBody = JSON.stringify(dataToSend);
      console.log("data a enviar en device", formBody);
      fetch(
        `http://Amplify-env.eba-gfgbyjuc.us-east-1.elasticbeanstalk.com/bars/device/` +
          rut,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: formBody,
        }
      )
        .then((response) => {
          const statusCode = response.status;
          const data = response.json();
          return Promise.all([data, statusCode]);
        })
        .then((data, statusCode) => {
          if (data[1] === 200) {
            console.log("se guardo el device con exito");
            setPlaylistRepeatMode(device);
            setIsLoggedIn(true);
          } else {
            console.log("no se pudo guardar el device", data[0]);
          }
        });
    }
  }
  function setPlaylistRepeatMode(device) {
    console.log("entre al set playlist repeat mode con device", device);
    var url = new URL("https://api.spotify.com/v1/me/player/repeat");
    var params = { state: "context", device_id: device };
    url.search = new URLSearchParams(params).toString();
    fetch(url, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        console.log("respuesta del set repeat mode", response);
        const statusCode = response.status;
        console.log("setPlaylistRepeatMode status code", statusCode);
        const data = response.json();
        return Promise.all([data, statusCode]);
      })
      .then((data, statusCode) => {
        if (data[1] === 204) {
          console.log("se actualizo el repat mode con exito");
        } else {
          console.log("no se pudo actualizar el repeat mode", data[1]);
        }
      });
  }



  const changeRoute = () => {
    let path = `/UpdateUser`;
    history.push(path);
  };

  return (
    <div>
      <header>
        <a href="/" className="logout">
          Cerrar Sesion
        </a>
        <button className="userButton" onClick={changeRoute}>
          <FontAwesomeIcon icon={faUser} size="2x" className="userIcon" />
        </button>
      </header>
      <div className="home">
        {!isLoggedIn && (
          <header>
            <h1>Bienvenido, {sessionStorage.getItem("barName")}!</h1>
          </header>
        )}

        {!isLoggedIn && (
          <div className="loginSpot">
            <div className="sync">
              Para sincronizar tu dispositivo, por favor clickea aqui:{" "}
            </div>
            <div>
              <div className="link">
                <a
                  className="btn--loginApp-link"
                  href={`${authEndpoint}?client_id=${clientId}&client_secret=${client_secret}&redirect_uri=${redirectUri}&scope=${scopes.join(
                    "%20"
                  )}&response_type=code&show_dialog=true`}
                >
                  Login a Spotify
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {isLoggedIn ? (
        <div className="lists">
          <div className="playListAmplify">
            <div className="tuPlaylist">
              <h4>Amplify Playlist</h4>
            </div>
            <div>
              <MusicSearch/>
              </div>
            <Playlist />
          </div>

          <div className="playlistName">
            <div className="tuPlaylist">
              <h4>Spotify Player</h4>
            </div>
            <Frame />
          </div>
        </div>
      ) : (
        <div> </div>
      )}

      <footer className="social-container">
        <div className="icons-bottom">
          <a
            href="https://www.facebook.com/learnbuildteach/"
            className="facebook social"
          >
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a
            href="https://www.instagram.com/learnbuildteach"
            className="instagram social"
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <a
            href="https://www.twitter.com/jamesqquick"
            className="twitter social"
          >
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
        </div>
      </footer>
    </div>
  );
};
export default AuthHandler;
