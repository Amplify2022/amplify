// export default async (playList, token) => {
//   const res = await fetch(`https://api.spotify.com/v1/playlists/${playList}`, {
//     method: 'GET',
//     headers: {
//       Authorization: 'Bearer ' + token,
//     },
//   });
//   const list = await res.json();
//   global.songOfThePlayList = list.tracks.items;
//   return list.tracks.items;
// };
