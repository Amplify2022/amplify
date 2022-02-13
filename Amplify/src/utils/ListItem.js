import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {color} from 'react-native-elements/dist/helpers';
import AddIcon from './AddIcon';
import authHandler from './authenticationHandler';
import base64 from 'react-native-base64';
import queryString from 'query-string';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import Home from '../screens/Home/Home';

const ListItem = props => {
  const _rut = useSelector(state => state.rut);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const authorizeSpotify = () => {
    //requestUserAuthorization();
    authHandler.onLogin();
    console.log('PRUEBA DEL GLOBALTOKEN', global.authorizeToken);
  };

  function isEmpty(stValue) {
    if (stValue == '' || stValue == null || stValue == undefined) {
      return true;
    }
    return false;
  }
  const addItemToPlaylist = item => {
    console.log('ListItem -> addItemToPlaylist -> item ->', item);
    var dataToSend = {
      uri: item.uri,
      name: item.name,
      artist: item.artist,
      image: item.imageUri,
    };
    let formBody = JSON.stringify(dataToSend);
    const rut = global.rutGlobal;

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
        console.log('ListItem-> addSong-> RESPUESTA DEL FETCH', response);
        const statusCode = response.status;
        const respuesta = response;
        return Promise.all([respuesta, statusCode]);
      })
      .then((respuesta, statusCode) => {
        dispatch({type: 'LOAD_SONGS', payload: {songsLoaded: false}});
        navigation.navigate('Home');
        console.log('AGREGAMOS EL TEMA', respuesta);
      });
  };

  return (
    <View style={styles.container}>
      <View>
        {props.items.map(item => (
          <TouchableOpacity onPress={() => addItemToPlaylist(item)}>
          <View key={item.id} style={styles.listItem}>    
            <Image style={styles.imgs} source={{uri: item.imageUri}} />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}>
            <View style={styles.textLimit}>
              <Text style={styles.songText}>{item.name} | {item.artist} 
              </Text>
              </View>
              </View>
          </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    height: 50,
    margin: 5,
    marginTop: 10,
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: 'green',
    flexDirection: 'row',
    width: '98.5%',
    borderRadius: 12,
    //paddingHorizontal: 10,
  },
  textSong: {
    fontSize: 17,
    color: 'white',
  },
  button: {
    color: 'black',
  },
  container: {
    backgroundColor: 'black',
  },
  songText: {
    color: 'black',
  },
  imgs: {
    height: 45,
    width: 45,
    marginRight: 30,
    borderRadius: 12,
  },
  textLimit: {
    textAlign: 'left',
  },
});

export default ListItem;
