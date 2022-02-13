// ListItem.js
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {color} from 'react-native-elements/dist/helpers';
//import Like from './Like';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {black} from 'react-native-paper/lib/typescript/styles/colors';

const ListBarItems = props => {
  const rut = useSelector(state => state.rut);
  const navigation = useNavigation();
  //const [songs, setSongs] = useState(props);

  const voteSong = item => {
    console.log('ListBarItes -> voteSongs -> ', item);
    if (!item.voted) {
      console.log('ListBarItems -> voteSong -> item ->', item);
      var dataToSend = {
        uri: item.uri,
        //position: 0,
      };
      let formBody = JSON.stringify(dataToSend);
      console.log('ListBarItems -> el rut del selector ->', global.rutGlobal);
      console.log('ListBarItems -> esta es la data a enviar ->', formBody);

      fetch(
        `http://Amplify-env.eba-gfgbyjuc.us-east-1.elasticbeanstalk.com/bars/voteSong/` +
          global.rutGlobal,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: formBody,
        },
      )
        .then(response => {
          const statusCode = response.status;
          const respuesta = response;
          return Promise.all([respuesta, statusCode]);
        })
        .then(respuesta => {
          if (respuesta[1] === 200) {
            item.voted = true;
            console.log('ListBarItes -> voteSongs -> despues de fetch->', item);
            console.log('ListBarItems -> status 200 -> Se votó con éxito!');
          } else {
            console.log(
              'ListBarItems -> status distinto a 200 -> NO SE PUDO VOTAR!',
            );
          }
        });
    }
  };

  console.log('ESTAS SON LAS PROPS QUE NOS LLEGAN', props);
  return (
    <View style={styles.container}>
      <View>
        {props.items.map(item => (
          <View key={item.id} style={styles.listItem}>
            <Image style={styles.imgs} source={{uri: item.image}} />
            <View style={styles.textLimit}>
              <Text style={styles.songText}>
                {item.name} | {item.artist}
              </Text>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}>
              <View style={styles.votesView}>
                <View>
                  <Text style={{color: 'white'}}>{item.votes} </Text>
                </View>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.voteButton}
                  onPress={() => voteSong(item)}>
                  <Text style={styles.voteText}>votar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
    justifyContent: 'space-between',
    borderWidth: 1,
    backgroundColor: '#8C8C8C',
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
    marginRight: 10,
    borderRadius: 12,
  },
  textLimit: {
    maxWidth: '70%',
    textAlign: 'left',
  },
  votesView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: 'black',
    width: 35,
    height: 35,
    borderWidth: 0.25,
    borderRadius: 25,
  },
  voteButton: {
    width: 55,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderColor: 'white',
    borderWidth: 0.25,
    borderRadius: 25,
    backgroundColor: 'black',
  },
  voteText: {color: 'white'},
});

export default ListBarItems;
