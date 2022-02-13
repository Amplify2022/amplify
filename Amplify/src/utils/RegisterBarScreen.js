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

const RegisterBarScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [barName, setBarName] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userRut, setUserRut] = useState('');
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
    if (!userName) {
      alert('Por favor ingrese nombre de usuario');
      return;
    }
    if (!userEmail) {
      alert('Por favor ingrese Email');
      return;
    }
    if (!userPassword) {
      alert('Por favor ingrese Password');
      return;
    }
    if (!userConfirmationPassword) {
      alert('Por favor confirme Password');
      return;
    }
    if (!barName) {
      alert('Por favor ingrese nombre del bar');
      return;
    }
    if (!userPhone) {
      alert('Por favor ingrese un telefono');
      return;
    }
    if (!userRut) {
      alert('Por favor ingrese un numero de RUT');
      return;
    }
    if (!userAddress) {
      alert('Por favor ingrese un numero de RUT');
      return;
    }
    //Show Loader
    setLoading(true);
    var dataToSend = {
      userType: 'BAR',
      firstName: userFirstName,
      lastName: userLastName,
      username: userName,
      password: userPassword,
      passwordConfirmation: userConfirmationPassword,
      email: userEmail,
      barName: barName,
      address: userAddress,
      phone: userPhone,
      rut: userRut,
      profilePic: userProfilePic,
    };
    let formBody = JSON.stringify(dataToSend);
    console.log(formBody);

    fetch(
      'http://amplifyproject-env.eba-7mkza2i7.us-east-1.elasticbeanstalk.com/bars/save',
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
          console.log(data[1]);
          setErrortext(data[0].message);
          alert(errortext);
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
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
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
              placeholder="Enter username"
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
              onChangeText={barName => setBarName(barName)}
              underlineColorAndroid="#f000"
              placeholder="Enter bar name"
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
              placeholder="Enter first name"
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
              placeholder="Enter last name"
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
              onChangeText={userAddress => setUserAddress(userAddress)}
              underlineColorAndroid="#f000"
              placeholder="Enter bar address"
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
              onChangeText={userRut => setUserRut(userRut)}
              underlineColorAndroid="#f000"
              placeholder="Enter bar RUT"
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
              placeholder="Enter Email"
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
              placeholder="Enter Password"
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
              placeholder="Confirm Password"
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
              placeholder="Enter phone number"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              ref={addressInputRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserProfilePic => setUserProfilePic(UserProfilePic)}
              underlineColorAndroid="#f000"
              placeholder="Select profile pic"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              ref={addressInputRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>{errortext}</Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterBarScreen;

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
    backgroundColor: 'green',
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
