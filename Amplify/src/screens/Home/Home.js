import React, { useState, useEffect } from 'react';
import Dropdown from '../../utils/Dropdown';
import base64 from 'react-native-base64';
import Listbox from '../../utils/Listbox';
import Detail from '../../utils/Detail';
import ListBarItems from '../../utils/ListBarItems';
import spotify_token from '../../utils/spotify_token';
import MusicSearch from '../../utils/MusicSearch';
import {
  Button,
  Image,
  Picker,
  View,
  ScrollView,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import useForceUpdate from 'use-force-update';
import Footer from '../../utils/Footer';
//import playListFetch from '../../utils/playListFetch';

const Home = () => {
  global.songOfThePlayList;
  const navigation = useNavigation();
  const playList = useSelector(state => state.playListID);
  const songsLoaded = useSelector(state => state.songsLoaded);
  const forceUpdate = useForceUpdate();
  const [token, setToken] = useState('');
  const dispatch = useDispatch();
  const [genres, setGenres] = useState({
    selectedGenre: '',
    listOfGenresFromAPI: [],
  });
  const [songs, setSongs] = useState([]);
  const [voted, setVoted] = useState(false);
  const [trackDetail, setTrackDetail] = useState(null);
  const barName = global.barName;
  const barPhone = global.barPhone;
  const barAddress = global.barAddress;
  const barProfilePic = global.profilePic;
  const musicGener = global.musicGender;
  console.log("la pic del bar",barProfilePic);
  function isEmpty(value) {
    var logTitle = 'isEmpty';
    try {
      if (
        value == null ||
        value == '' ||
        !value ||
        value == 'NaN' ||
        value == 'undefined'
      ) {
        return true;
      }
      return false;
    } catch (error) {
      log.error(logTitle, error);
    }
  }

  // const changeToVoted = () => {
  //   setVoted(true);
  // };

  //spotify_token();
  if (!songsLoaded) {
    let rut = global.rutGlobal;

    fetch(
      `http://Amplify-env.eba-gfgbyjuc.us-east-1.elasticbeanstalk.com/bars/getItems/` +
      rut,
      {
        method: 'GET',
        headers: {},
      },
    )
      .then(response => {
        console.log('Home -> Fetch -> Respuesta del fetch: ', response);
        const statusCode = response.status;
        const respuesta = response.json();

        return Promise.all([respuesta, statusCode]);
      })
      .then((respuesta, statusCode) => {
        if (respuesta[1] === 200) {
          console.log(
            'Home -> Fetch -> Respuesta del segundo .then del fetch: ',
            respuesta[0],
          );
          setSongs(respuesta[0]);
          for (var i = 0; i < respuesta[0].length; i++) {
            respuesta[0][i].voted = false;
          }
          setSongs(respuesta[0]);
          console.log('Home -> getItems -> Songs -> ', songs);

          //songsLoaded = false;
          // setSongsListed(true);
          dispatch({ type: 'LOAD_SONGS', payload: { songsLoaded: true } });
          // setSongsLoaded(true);
        } else {
          console.log('RESPUESTA DEL BACKEND', respuesta);
        }
      });
  }

  // if (isEmpty(songs)) {
  //   return (
  //     <View style={styles.view}>
  //       <TouchableOpacity
  //         style={styles.proposeButton}
  //         onPress={() => navigation.navigate('MusicSearch')}>
  //         <Text>Propone un tema!</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // } else {
  //   console.log('ASI QUEDAN LAS CANCIONES DESPUES DE SETEADas--=>', songs);
  //   return (
  //     <View>
  //       <View style={styles.view}>
  //         <TouchableOpacity
  //           style={styles.proposeButton}
  //           onPress={() => navigation.navigate('MusicSearch')}>
  //           <Text>Propone un tema!</Text>
  //         </TouchableOpacity>
  //       </View>
  //       <View>
  //         <ScrollView>
  //           <ListBarItems items={songs} />
  //         </ScrollView>
  //       </View>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.imageContainer} >
        <Image
          source={{uri: barProfilePic}}
          style={styles.barImage} 
        />
         <Text style={styles.barInfo}>{barName}</Text>
         <Text style={styles.barInfo}>{barAddress}</Text>
         <Text style={styles.barInfo}>{barPhone}</Text>
         <Text style={styles.barInfo}>Genero Preferido: {musicGener}</Text>
         

      <View style={styles.view}>
        <TouchableOpacity
          style={styles.proposeButton}
          onPress={() => navigation.navigate('MusicSearch')}>
          <Text style={styles.proposeText}>Proponé un tema!</Text>
        </TouchableOpacity>
      </View>
      {!isEmpty(songs) ? (
        <ScrollView>
            <ListBarItems items={songs} />
        </ScrollView>
      ) : (
        <></>
      )}


    </View>

  );
};

const styles = StyleSheet.create({
  button: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 3,
  },
  view: {
    alignItems: 'center',
    display: 'flex',
    backgroundColor: 'black',
  },
  viewMain: {
    alignItems: 'center',
  },
  imageView: {
    //alignItems: 'center',
    display: 'flex',
  },
  imageContainer: {
    backgroundColor: 'black',
    justifyContent : 'center',
    display: 'flex'
  },
  proposeButton: {
    width: '99%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 0.25,
    backgroundColor: 'darkgrey',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor:'black', 
  },
  text: {
    textAlign: 'center',
    width: 100,
  },
  proposeText: {
    color: 'white',
    fontSize: 16,
  },
  barInfo: {
    color: 'white',
    fontSize: 18,
    display: 'flex',
  },
  footer: {
    width: '100%',
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  barImage: {
    height: '30%',
    width: '100%'
    
  },
});

export default Home;
