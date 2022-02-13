import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';


const ListItem = props => {
  const _rut = useSelector(state => state.rut);
  const dispatch = useDispatch();

  function isEmpty(stValue) {
    if (stValue == '' || stValue == null || stValue == undefined) {
      return true;
    }
    return false;
  }
  const addItemToPlaylist = item => {
      console.log(item.uri);
    var dataToSend = {
      uri: item.uri,
      name: item.name,
      artist: item.artist,
      image: item.imageUri
    };
    
    let formBody = JSON.stringify(dataToSend);
    console.log("-------DATA TO SEND: ", formBody)
    const rut = sessionStorage.getItem("rut");
   

    fetch(
      `http://Amplify-env.eba-gfgbyjuc.us-east-1.elasticbeanstalk.com/bars/addSong/` +
        rut,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: formBody,
      },
    )
      .then(response => {
        console.log('RESPUESTA DEL FETCH', response);
        const statusCode = response.status;
        const respuesta = response;
        return Promise.all([respuesta, statusCode]);
      })
      .then((respuesta, statusCode) => {
        dispatch({type: 'LOAD_SONGS', payload: {songsLoaded: false}});
        
        console.log('AGREGAMOS EL TEMA', respuesta);
      });
  };

  return (
    <div className='itemsDiv'>
      <div >
        {props.items.map(item => (
          <div key={item.name} >
            <div onClick={() => addItemToPlaylist(item)}>
              <div >{item.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default ListItem;
