import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

const ActionBarIcon = ()=> {
    const navigation = useNavigation();

    function goProfile ()  {
        console.log("go to user profile");
        navigation.navigate('ProfileScreen')
      }

    return (
        <TouchableOpacity onPress={() => goProfile()}>
            <Image
                source={{ uri: global.userProfilePic }}
                style={{ width: 45, height: 45, borderRadius: 45 / 2, marginLeft: 5, marginRight: 15 }} />
        </TouchableOpacity>
    )
  }

export default ActionBarIcon;