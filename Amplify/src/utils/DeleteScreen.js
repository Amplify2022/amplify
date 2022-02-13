import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login/LoginScreen';

const DeleteScreen = ({navigation}) => {
  const handleSubmitButton = () => {
    console.log(global.username);

    fetch(
      'http://amplifyproject-env.eba-7mkza2i7.us-east-1.elasticbeanstalk.com/clients/delete/' +
        global.username,
      {
        method: 'DELETE',
        headers: {
          //Header Defination
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => {
        console.log('--------------------------');
        const statusCode = response.status;
        const data = response.json();
        console.log(statusCode);
        console.log(data);
        return Promise.all([data, statusCode]);
      })
      .then((data, statusCode) => {
        // If server response message same as Data Matched
        if (data[1] === 200) {
          console.log('Registration Successful. Please Login to proceed');
          alert('Se borro el usuario con exito');
          //    navigation.navigate('LoginScreen');
          // setIsRegistraionSuccess(true);
        } else {
          console.log(data[1]);
        }
      })
      .catch(error => {
        console.error(error.message);
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: '#307ecc'}}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <Text>Estas seguro de querer borrar tu cuenta?</Text>
          </View>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>DELETE</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default DeleteScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});
