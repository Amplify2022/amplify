import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import PlaylistStyles from "../componentes/PlaylistStyles.css";

const Playlist = () => {
  const [playList, setPlayList] = useState("");
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const [songs, setSongs] = useState([]);
  const songsLoaded = useSelector((state) => state.songsLoaded);
  const [isShownDelete, setIsShownDelete] = useState(false);

  function deleteSong(item) {
    var rut = sessionStorage.getItem("rut");

    let dataToSend = {
      uri: item.track.uri,
      name: "",
      artist: "",
      image: "",
    };
    let formBody = JSON.stringify(dataToSend);
    console.log("data to send on delete song", formBody);
    fetch(
      `http://Amplify-env.eba-gfgbyjuc.us-east-1.elasticbeanstalk.com/bars/deleteSongFromSpotify/` +
        rut,
      {
        method: "DELETE",
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
          console.log("se borro con exito");
        } else {
          console.log("no se pudo borrar la cancion", data[0]);
        }
      });
  }

  useEffect(() => {
    console.log("el token del v1/me", token);
    fetch(`https://api.spotify.com/v1/me`, {
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
          console.log("obtuve el user", data[0].id);
          sessionStorage.setItem("spotifyUser", data[0].id);
          console.log("el user que le paso al getplaylistid es:", data[0].id);
          getPlaylistId(data[0].id);
        } else {
          console.log("no obtuve el user", data[0]);
        }
      });

    function getPlaylistId(spotifyUser) {
      console.log("El user que recibe el getplaylistID es: ", spotifyUser);
      fetch(`https://api.spotify.com/v1/users/${spotifyUser}/playlists`, {
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
            console.log("obtuve la lista de playlists", data[0]);
            var items = data[0].items;
            for (var i = 0; i < items.length; i++) {
              if (items[i].name == "Amplify") {
                console.log("PlaylistID = ", items[i]);
                setPlayList(items[i].id);
                setPlaylistInBackEnd(items[i].id);
                sessionStorage.setItem("playlistId", items[i].id);
              }
            }
          } else {
            console.log("no obtuve el user", data[0]);
          }
        });
    }

    function setPlaylistInBackEnd(playListID) {
      console.log("save playlist method");
      var rut = sessionStorage.getItem("rut");

      let dataToSend = {
        playListID: playListID,
      };
      let formBody = JSON.stringify(dataToSend);
      console.log("data a enviar en playlist", formBody);
      fetch(
        `http://Amplify-env.eba-gfgbyjuc.us-east-1.elasticbeanstalk.com/bars/playlist/` +
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
            console.log("se guardo la playlist con exito");
          } else {
            console.log("no se pudo guardar la playlist", data[0]);
          }
        });
    }

    function isEmpty(value) {
      if (value == null) {
        return true;
      }
      if (value == undefined) {
        return true;
      }
      if (value == "undefined") {
        return true;
      }
      if (value == "") {
        return true;
      }
      //NaN
      if (value == NaN) {
        return true;
      }
      if (value == "NaN") {
        return true;
      }
      return false;
    }

    if (!songsLoaded && !isEmpty(playList)) {
      console.log("playlist: ", playList);
      fetch(`https://api.spotify.com/v1/playlists/${playList}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => {
          const statusCode = response.status;
          const respuesta = response.json();
          return Promise.all([respuesta, statusCode]);
        })
        .then((respuesta) => {
          if (respuesta[1] === 200) {
            console.log("respuesta de los temas", respuesta[0]);
            setSongs(respuesta[0].tracks.items);
            dispatch({ type: "LOAD_SONGS", payload: { songsLoaded: true } });
          } else {
            console.log("RESPUESTA DE SPOTIFY PARA CARGAR TEMA", respuesta);
          }
        });
    }
  });

  return (
    <div className="mainPlaylist">
      <div>
        {songs.map((item) => (
          <div className="barSongs">
            <div className="items" key={item.track.name}>
              <div className="songItems">
                <div className="songItems">
                  <div>
                    <img src={item.track.album.images[2].url} class="imgs" />
                  </div>
                  <div className="">
                    {item.track.name} | {item.track.artists[0].name}{" "}
                  </div>
                </div>
                <div onClick={() => deleteSong(item)}>
                  <FontAwesomeIcon icon={faTrash} className="icons" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;
