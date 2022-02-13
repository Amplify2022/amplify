const apiPrefix = 'https://api.spotify.com/v1';

export default async ({offset, limit, q}) => {
  const uri = `${apiPrefix}/search?query=${encodeURIComponent(
    q,
  )}&type=track&limit=${limit}&offset=${offset}`;
  console.log('search begin, uri =', uri, 'token =', global.token);

  const res = await fetch(uri, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem("token"),
    },
  });

  const json = await res.json();
  console.log('respuesta de spotify', json);
  if (!res.ok) {
    return [];
  }

  const {
    tracks: {items},
  } = json;

  return items.map(item => ({
    id: item.id,
    name: item.name,
    popularity: item.popularity,
    artist: item.artists ? item.artists[0].name : undefined,
    album: item.album.name,
    is_playable: item.is_playable,
    preview_url: item.preview_url,
    imageUri: item.album.images ? item.album.images[0].url : undefined,
    uri: item.uri,
  }));
};
