//spotify_token.js

import base64 from 'react-native-base64';

const apiPrefix = 'https://accounts.spotify.com/api';
const client_id = '9b8d493c362e4885839078aa7b59eb69';
const client_secret = '5258e52db2a2481c90d5c0fc86e42554';

const base64credentials = base64.encode(client_id + ':' + client_secret);

export default async () => {
  const res = await fetch(`${apiPrefix}/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${base64credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  const json = await res.json();
  const newToken = json.access_token;
  global.token = newToken;
  return newToken;
};
