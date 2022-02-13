import initialState from "../store/initialState.js";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_TOKEN":
      return { authToken: action.payload.authToken };
    case "DEVICE":
      return { deviceID: action.payload.deviceID };
    case 'LOAD_SONGS':
      return {songsLoaded: action.payload.songsLoaded};
    case "BAR":
      return { rut: action.payload.rut, barName: action.payload.barName };
    case "LOGIN":
      return {
        ...state,
        key: [action.payload.apiKey],
        logueado: true,
        idVendedor: action.payload.id,
      };
    default:
      return state;
  }
};

export default reducer;
