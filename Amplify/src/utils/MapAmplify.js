import React, {useState, createRef, Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import MapView from 'react-native-maps';
import {Marker, Callout} from 'react-native-maps';
import Home from '../screens/Home/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import CallOutBarImage from './CallOutBarImage';


import useForceUpdate from 'use-force-update';
import {createIconSetFromFontello} from 'react-native-vector-icons';

const MapAmplify = () => {
  //global.playListID;
  //global.rut;
  global.rutGlobal;
  global.profilePic;
  global.barName;
  global.barPhone;
  global.barAddress;
  global.musicGender
  const dispatch = useDispatch();
  const [bars, setBars] = useState([]);
  const navigation = useNavigation();
  const forceUpdate = useForceUpdate();
  
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

  if (isEmpty(bars)) {
    fetch(
      'http://Amplify-env.eba-gfgbyjuc.us-east-1.elasticbeanstalk.com/bars/list',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => {
        //console.log('MapsAmplify-> Fetch getbars -> response -> ', response);
        if (response.status === 200) {
          const data = response.json();
          return Promise.all([data]);
        }
      })
      .then(data => {
        //console.log('MapsAmplify-> Fetch getbars -> ', data);
        setBars(data[0]);
        //console.log('ESTOS SON LOS BARES     ', data[0]);
        dispatch({type: 'LOAD_SONGS', payload: {songsLoaded: false}});
      });
  }

  const goBarHome = (_playListID, _rut,_profilePic,_barName,_phone,_address,_musicGender) => {
    console.log("imagen a pasar",_profilePic );
    dispatch({type: 'SET_BAR', payload: {playListID: _playListID, rut: _rut}});
    global.rutGlobal = _rut;
    global.profilePic = _profilePic
    global.barName = _barName;
    global.barPhone = _phone;
    global.barAddress = _address;
    global.musicGender = _musicGender;

    forceUpdate();
    navigation.navigate('Home');
  };

  return (
    <View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -34.90812,
          longitude: -56.15868,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider="google">
        {bars.map(item => (
          <Marker style={styles.marker}
            key={item.id}
            
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}>
            <Callout 
            onPress={() => goBarHome(item.playList_id, item.rut,item.profilePic,item.barName,item.phone,item.address,item.musicGender)}
            >

              
              {/* <Text style = {styles.marker}>
                  <Image 
                  style={styles.buttonCallout}
                source={{uri: item.profilePic}}
              /> 
              </Text>  */}
                 <CallOutBarImage item={item.profilePic}  />  
              
               <Text>{item.barName}</Text>
              <Text>{item.address}</Text>
              <Text>{item.musicGender}</Text>


            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default MapAmplify;

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  // callout: {
  //   width: 250,
  //   height: 250,
  // },
  marker:{
    justifyContent : 'center',
  },
    buttonCallout: {
      borderWidth: 0.5,
      height: 150,
      width: 120,

    },
    bubble: {
      borderRadius: 10,
      height: 200,
      width: 200,
      
    },

});
