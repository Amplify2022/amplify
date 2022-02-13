import initialState from '../store/initialState';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BAR':
      console.log('ESTO ES LO QUE LLEGA AL REDUCER', action.payload);
      return {playListID: action.payload.playListID, rut: action.payload.rut};
    case 'LOAD_SONGS':
      return {songsLoaded: action.payload.songsLoaded};

    default:
      return state;
  }
};

export default reducer;
