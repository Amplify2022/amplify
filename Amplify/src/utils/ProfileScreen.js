import React, { useState, createRef, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';

import { RadioButton } from 'react-native-paper';

import ImagePicker from 'react-native-image-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Dropdown } from 'react-native-material-dropdown';
import { Picker } from '@react-native-picker/picker';



const ProfileScreen = ({ navigation }) => {
  const userLogged = global.username;
  const [userNameFetch, setUserNameFetch] = useState("");
  const [userFirstNameFetch, setUserFirstNameFetch] = useState("");
  const [userLastNameFetch, setUserLastNameFetch] = useState("");
  const [userEmailFetch, setUserEmailFetch] = useState("");
  const [userPhoneFetch, setUserPhoneFetch] = useState("");
  const [userGenderFetch, setUserGenderFetch] = useState("");
  const [userDobFetch, setUserDobrFetch] = useState("");
  const [userProfilePicFetch, setUserProfilePicFetch] = useState("");
  const [userPasswordFetch, setUserPasswordFetch] = useState("");
  const [userPasswordConfirmationFetch, setUserPasswordConfirmationFetch] = useState("");

  useEffect(() => {

    console.log("user name", userLogged);
    fetch(
      `http://Amplify-env.eba-gfgbyjuc.us-east-1.elasticbeanstalk.com/clients/findByUsername/` + userLogged,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([data, statusCode]);
      })
      .then((data) => {
        if (data[1] === 200) {
          console.log("obtuve el user", data[0]);
          setUserNameFetch(data[0].username);
          setUserFirstNameFetch(data[0].firstName);
          setUserLastNameFetch(data[0].lastName);
          setUserEmailFetch(data[0].email);
          setUserPhoneFetch(data[0].phone);
          //setUserGenderFetch(data[0].gender)
          setUserDobrFetch(data[0].dob);
          setUserProfilePicFetch(data[0].profilePic);
          setUserPasswordFetch(data[0].password);
          setUserPasswordConfirmationFetch(data[0].passwordConfirmation);
        } else {
          console.log("no obtuve el user");
        }
      });
  }, []);



  const [userName, setUserName] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userDob, setUserDob] = useState('');
  //const [userGender, setUserGender] = useState('Seleccione su género...');
  const [userProfilePic, setUserProfilePic] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmationPassword, setUserConfirmationPassword] = useState('');


  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const addressInputRef = createRef();
  const passwordInputRef = createRef();

  const handleSubmitButton = () => {
    setErrortext('');
    if (!userNameFetch) {
      alert('Por favor complete el nombre');
      return;
    }
    if (!userEmailFetch) {
      alert('Por favor complete el Email');
      return;
    }
    if (!userPasswordFetch) {
      alert('Por favor complete la contraseña');
      return;
    }
    if (!userPasswordConfirmationFetch) {
      alert('Por favor complete la confirmación de contraseña');
      return;
    }
    if (userPasswordFetch != userPasswordConfirmationFetch) {
      alert('Las contraseñas no coinciden');
      return;
    }
    if (!userFirstNameFetch) {
      alert('Por favor ingrese su nombre');
      return;
    }
    if (!userLastNameFetch) {
      alert('Por favor ingrese su apellido');
      return;
    }
    if (!userPhoneFetch) {
      alert('Por favor ingrese su numero de telefono');
      return;
    }
    if (userProfilePicFetch == '') {
      alert('Seleccione una imagen');
      return;
    }

    //Show Loader

    var dataToSend = {
      firstName: userFirstNameFetch,
      lastName: userLastNameFetch,
      username: userNameFetch,
      password: userPasswordFetch,
      passwordConfirmation: userPasswordConfirmationFetch,
      email: userEmailFetch,
      phone: userPhoneFetch,
      dob: userDobFetch,
      gender: userGenderFetch,
      profilePic: userProfilePicFetch,
    };
    let formBody = JSON.stringify(dataToSend);
    console.log(formBody);

    fetch(
      'http://Amplify-env.eba-gfgbyjuc.us-east-1.elasticbeanstalk.com/clients/update',
      {
        method: 'PUT',
        body: formBody,
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

        if (data[1] === 200) {
          console.log('Usuario actualizado con exito');
          alert('Se actualizaron los datos con exito');
          navigation.navigate('Home');
        } else {
          console.log(data[10]);
          alert(data[0].message);
          setErrortext(data[0].message);
        }
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error.message);
      });
  };
  const options = {
    title: 'Selecciona una imagen',
    storageOptions: {
      skipBackup: true,
      path: 'images',
      mediaType: 'photo',
    },
    includeBase64: true,
  };

  const openPicker = () => {
    const result = launchImageLibrary(options, response => {
      console.log('Response = ', response.assets[0].uri);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can also display the image using data:
        const source = { uri: 'data:image/jpeg;base64,' + response.base64 };
        setUserProfilePicFetch(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={styles.SectionNew}>
          <Text style={styles.text}>Nombre de usuario</Text>
        </View>
        <KeyboardAvoidingView enabled>

          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserName => setUserNameFetch(UserName)}
              underlineColorAndroid="#f000"
              value={userNameFetch}
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserFirstName => setUserFirstNameFetch(UserFirstName)}
              underlineColorAndroid="#f000"
              value={userFirstNameFetch}
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserLastName => setUserLastNameFetch(UserLastName)}
              underlineColorAndroid="#f000"
              value={userLastNameFetch}
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserEmail => setUserEmailFetch(UserEmail)}
              underlineColorAndroid="#f000"
              value={userEmailFetch}
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserPhone => setUserPhoneFetch(UserPhone)}
              underlineColorAndroid="#f000"
              value={userPhoneFetch}
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserDob => setUserDobrFetch(UserDob)}
              underlineColorAndroid="#f000"
              value={userDobFetch}
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput 
              secureTextEntry={true}
              style={styles.inputStyle}
              onChangeText={UserPassword => setUserPasswordFetch(UserPassword)}
              underlineColorAndroid="#f000"
              value={userPasswordFetch}
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              secureTextEntry={true}
              style={styles.inputStyle}
              onChangeText={UserPasswordConfirmation => setUserPasswordConfirmationFetch(UserPasswordConfirmation)}
              underlineColorAndroid="#f000"
              value={userPasswordConfirmationFetch}
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>


          {/* <View style={styles.pickerContainer}>
              <Picker
                selectedValue={userGender}
                style={{ height: 50, width: 250 }}
                onValueChange={itemValue => setUserGender(itemValue)}>
                <Picker.Item
                  //style={styles.inputStylePicker}
                  label="Seleccione su género..."
                  value=""
                  placeholder="Seleccione su género..."
                  color="#8b9cb5"
                  enabled={false}
                />
                <Picker.Item
                  style={styles.inputStylePicker}
                  label="Femenino"
                  value="femenino"
                  color="#8b9cb5"
                />
                <Picker.Item
                  style={styles.inputStylePicker}
                  label="Masculino"
                  value="masculino"
                  color="#8b9cb5"
                />
              </Picker>
            </View> */}
          {/* <View style={styles.SectionStyle}>
              <Text style={styles.text}>Indique su género:</Text>
              <RadioButton
                style={styles.radioButton}
                title="MASCULINO"
                value="masculino"
                color="white"
                status={userGender === 'masculino' ? 'checked' : 'unchecked'}
                onPress={() => setUserGender('masculino')}
              />
              <Text color="#FFFFFF">M</Text>
              <RadioButton
                value="femenino"
                status={userGender === 'femenino' ? 'checked' : 'unchecked'}
                onPress={() => setUserGender('femenino')}
              />
              <Text color="#FFFFFF">F</Text>
              <RadioButton
                value="n/a"
                status={userGender === 'n/a' ? 'checked' : 'unchecked'}
                onPress={() => setUserGender('n/a')}
              />
              <Text color="#FFFFFF">N/A</Text>
            </View> */}

          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={openPicker}>
            <Text style={styles.buttonTextStyle}>Seleccionar imagen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>MODIFICAR</Text>
          </TouchableOpacity>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>{errortext}</Text>
          ) : null}

        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );

};
export default ProfileScreen;


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
  radioButton: {
    color: 'white',
  },
  text: {
    color: 'white',
  },
  pickerContainer: {
    flexDirection: 'row',
    backgroundColor: 'black',
    borderWidth: 1,
    color: 'white',
    borderColor: 'white',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  inputStylePicker: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  SectionNew:{
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  }
  

});