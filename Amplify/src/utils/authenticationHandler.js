import {authorize, refresh} from 'react-native-app-auth';

global.authorizeToken;

class AuthenticationHandler {
  constructor() {
    this.spotifyAuthConfig = {
      clientId: '9b8d493c362e4885839078aa7b59eb69',
      clientSecret: '5258e52db2a2481c90d5c0fc86e42554',
      redirectUrl: 'com.amplify:/oath2redirect',
      scopes: [
        'playlist-read-private',
        'playlist-modify-public',
        'playlist-modify-private',
        'user-library-read',
        'user-library-modify',
        'user-top-read',
      ],
      serviceConfiguration: {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
      },
    };
  }

  async onLogin() {
    try {
      const result = await authorize(this.spotifyAuthConfig);
      console.log(result);
      alert(JSON.stringify(result));
      console.log('ESTE ES EL FAMOSO TOKEN', result);
      global.authorizeToken = result.accessToken;
      return result.accessToken;
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }

  async refreshLogin(refreshToken) {
    const result = await refresh(this.spotifyAuthConfig, {
      refreshToken: refreshToken,
    });
    return result;
  }
}

const authHandler = new AuthenticationHandler();

export default authHandler;
