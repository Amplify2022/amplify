import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterScreen from '../../utils/RegisterScreen';
//import DeleteScreen from '../../utils/DeleteScreen';
import Home from '../Home/Home';
import spotify_token from '../../utils/spotify_token';
//import Searchbar from '../../utils/SearchBarScreen';
//import authenticationHandler from '../../utils/authenticationHandler';
import MapView from 'react-native-maps';
import {Marker, Callout} from 'react-native-maps';
import MapAmplify from '../../utils/MapAmplify';

const LoginScreen = ({navigation}) => {
  global.username;
  global.token;
  global.userProfilePic;
  const [user, setUser] = useState('');
  const [userPassword, setPassword] = useState('');
  const [errortext, setErrortext] = useState('');
  const [loading, setLoading] = useState(false);

  const goHome = () => {
    navigation.navigate('Home');
  };

  const handleSubmitPress = () => {
    setErrortext('');
    if (!user) {
      alert('Por favor ingresar el usuario');
      return;
    }
    if (!userPassword) {
      alert('Por favor ingresar la contraseña');
      return;
    }
    let dataToSend = {username: user, password: userPassword};
    let formBody = JSON.stringify(dataToSend);
    console.log(formBody);
    fetch(
      'http://Amplify-env.eba-gfgbyjuc.us-east-1.elasticbeanstalk.com/clients/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: formBody,
      },
    )
      .then(response => {
        console.log('--------------------------');
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([data, statusCode]);
      })
      .then((data, statusCode) => {
        //Hide Loader
        console.log("statuscode",statusCode);
        if (data[1] == 200) {
          console.log("data devuelta del login",data[0]);
          if (data[0] != null) {
            console.log(data[0].username);
            global.username = data[0].username;
            global.userProfilePic = data[0].profilePic
            console.log("username",data[0].username );
            //spotify_token();
            console.log('TOKEN DEL LOGIN', global.token);
            setLoading(true);
          } else {
            console.log('data empty');
          }
        } else {
          console.log('status distinto');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  if (loading) {
    //return <MapAmplify />;
    spotify_token();
    navigation.navigate('MapAmplify');
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('./images.png')} />

      {/* <StatusBar style="auto" /> */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Usuario"
          placeholderTextColor="rgb(255,255,255)"
          color="rgb(255,255,255)"
          onChangeText={user => setUser(user)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Contraseña"
          placeholderTextColor="rgb(255,255,255)"
          color="rgb(255,255,255)"
          secureTextEntry={true}
          onChangeText={userPassword => setPassword(userPassword)}
        />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgot_button}>Olvidó su contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={handleSubmitPress}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
        <Text style={styles.forgot_button}>Registrar usuario</Text>
      </TouchableOpacity>

      {errortext != '' ? (
        <Text style={styles.errorTextStyle}>{errortext}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(0,0,0)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: 'green',
    borderRadius: 30,
    width: '75%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: 'black',
    borderColor: 'white',
    justifyContent: 'center',
    borderWidth: 1,
    color: 'rgb(255,255,255)',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color: 'rgb(255,255,255)',
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
    marginTop: 10,
    color: 'rgb(256,256,256)',
  },

  loginText: {
    color: 'rgb(255,255,255)',
  },

  loginBtn: {
    width: '70%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: 'green',
    color: 'rgb(256,256,256)',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default LoginScreen;
