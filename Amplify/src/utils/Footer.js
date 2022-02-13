import React from "react";
import {TouchableOpacity, View, Text, Linking} from "react-native";
import ProfileScreen from "./ProfileScreen";

const Footer  = ({navigation}) =>  {

    const goProfile = () => {
        navigation.navigate('ProfileScreen');
      };

    return (
        <View  style={styles.appFooter}>
            <TouchableOpacity onPress={() => goProfile()}>
                <Text style={styles.textStyle}>Perfil </Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = {
    textStyle: {
        fontSize: 18
    },
    viewStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    appFooter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green'
    },
}
export default Footer;
