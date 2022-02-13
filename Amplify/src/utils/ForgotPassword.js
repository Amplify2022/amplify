import React, { useState, createRef } from 'react';
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


const ForgotPassword = ({ navigation }) => {
    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userConfirmationPassword, setUserConfirmationPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

    const handleSubmitButton = () => {
        setErrortext('');
        if (!userName) {
          alert('Por favor complete el nombre');
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
      
    
        //Show Loader
        setLoading(true);
        var dataToSend = {
          username: userName,
          password: userPassword,
          passwordConfirmation: userConfirmationPassword,
          phone: userPhone,
        };
        let formBody = JSON.stringify(dataToSend);
        console.log(formBody);
    
        fetch(
          'http://Amplify-env.eba-gfgbyjuc.us-east-1.elasticbeanstalk.com/clients/updateClientPassword',
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
            const data =response.json();
            console.log(statusCode);
            return Promise.all([data, statusCode]);
          })
          .then((data, statusCode) => {
            //Hide Loader
            setLoading(false);
            if (data[1] === 200) {
              console.log('Password updated');
              alert('Se actualizo la contraseña con exito');
            } else {
                alert(data[0].message);
              console.log(data[1]);
              //setErrortext(data[0]);
            }
          })
          .catch(error => {
            //Hide Loader
            setLoading(false);
            console.error(error.message);
          });
      };



    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
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
                        returnKeyType="next"
                        onSubmitEditing={Keyboard.dismiss}
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
                        returnKeyType="next"
                        secureTextEntry={true}
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
                        returnKeyType="next"
                        secureTextEntry={true}
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
                    <Text style={styles.buttonTextStyle}>Actualizar contraseña</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress ={() => navigation.navigate('LoginScreen')}>
                    <Text style={styles.buttonTextStyle}>Volver al Login</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        </View>
    );
};

export default ForgotPassword;

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
});

