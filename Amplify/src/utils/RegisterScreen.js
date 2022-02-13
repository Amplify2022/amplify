import React, { useState, createRef } from 'react';
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
import DatePicker from 'react-native-datepicker';

const RegisterScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [date, setDate] = useState(new Date());
  const [userGender, setUserGender] = useState('Seleccione su género...');
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

  const [showDatePicker, setShowDatePicker] = useState(false)

  const openDatePicker = () => {
    setShowDatePicker(true)
  }

  const onCancel = () => {
    // You should close the modal in here
    setShowDatePicker(false)
  }

  const onConfirm = (date) => {
    // You should close the modal in here
    setShowDatePicker(false)

    // The parameter 'date' is a Date object so that you can use any Date prototype method.
    console.log(date.getDate())
  }

  const handleSubmitButton = () => {
    setErrortext('');
    if (!userName) {
      alert('Por favor complete el nombre');
      return;
    }
    if (!userEmail) {
      alert('Por favor complete el Email');
      return;
    }
    if (!userPassword) {
      alert('Por favor complete la contraseña');
      return;
    }
    if (!userConfirmationPassword) {
      alert('Por favor complete la confirmación de contraseña');
      return;
    }
    if (userPassword != userConfirmationPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    if (!userFirstName) {
      alert('Por favor ingrese su nombre');
      return;
    }
    if (!userLastName) {
      alert('Por favor ingrese su apellido');
      return;
    }
    if (!userPhone) {
      alert('Por favor ingrese su numero de telefono');
      return;
    }
    if (userProfilePic == '') {
      alert('Seleccione una imagen');
      return;
    }

    //Show Loader
    setLoading(true);
    var dataToSend = {
      firstName: userFirstName,
      lastName: userLastName,
      username: userName,
      password: userPassword,
      passwordConfirmation: userConfirmationPassword,
      email: userEmail,
      phone: userPhone,
      dob: date,
      gender: userGender,
      profilePic: 'data:image/jpeg;base64,' + userProfilePic,
    };
    let formBody = JSON.stringify(dataToSend);
    console.log(formBody);

    fetch(
      'http://Amplify-env.eba-gfgbyjuc.us-east-1.elasticbeanstalk.com/clients/save',
      {
        method: 'POST',
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
        //Hide Loader
        setLoading(false);
        if (data[1] === 200) {
          console.log('Registration Successful. Please Login to proceed');
          alert('Se registro con exito');
          navigation.navigate('LoginScreen');
        } else {
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
  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#307ecc',
          justifyContent: 'center',
        }}>
        <Text style={styles.successTextStyle}>Registration Successful</Text>
      </View>
    );
  }

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
        //console.log("tengo response URI de image", response.assets[0].uri);
        //console.log("base 64 image", response.assets[0].base64);
        const source = { uri: 'data:image/jpeg;base64,' + response.assets[0].base64 };
        setUserProfilePic(response.assets[0].base64);
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
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserName => setUserName(UserName)}
              underlineColorAndroid="#f000"
              placeholder="Ingrese nombre de usuario"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserFirstName => setUserFirstName(UserFirstName)}
              underlineColorAndroid="#f000"
              placeholder="Ingrese su nombre"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserLastName => setUserLastName(UserLastName)}
              underlineColorAndroid="#f000"
              placeholder="Ingrese su apellido"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserEmail => setUserEmail(UserEmail)}
              underlineColorAndroid="#f000"
              placeholder="Ingrese su dirección de email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current && passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserPassword => setUserPassword(UserPassword)}
              underlineColorAndroid="#f000"
              placeholder="Ingrese contraseña"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              onSubmitEditing={() =>
                ageInputRef.current && ageInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserConfirmationPassword =>
                setUserConfirmationPassword(UserConfirmationPassword)
              }
              underlineColorAndroid="#f000"
              placeholder="Repita la contraseña ingresada"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              onSubmitEditing={() =>
                ageInputRef.current && ageInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserPhone => setUserPhone(UserPhone)}
              underlineColorAndroid="#f000"
              placeholder="Ingrese su teléfono"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              ref={addressInputRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <DatePicker
              style={styles.datePickerStyle}
              date={date}
              mode="date"
              placeholder="select date"
              format="DD-MM-YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={(date) => {
                setDate(date);
              }}
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  right: -5,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  borderColor: "gray",
                  alignItems: "flex-start",
                  borderWidth: 0,
                  borderBottomWidth: 1,
                },
                placeholderText: {
                  fontSize: 17,
                  color: "gray"
                },
                dateText: {
                  fontSize: 17,
                }
              }}
            />
          </View>
          {/* <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserDob => setUserDob(UserDob)}
              underlineColorAndroid="#f000"
              placeholder="Ingrese fecha de nacimiento"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              ref={addressInputRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View> */}

          <View style={styles.pickerContainer}>
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
          </View>

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
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>{errortext}</Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>REGISTRAR</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;

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
    color: 'white !important',
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
  datePickerStyle: {
    width: 230,
  },
});
