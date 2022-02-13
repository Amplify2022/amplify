import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    Image,
    Text,
    ImageBackground,
} from 'react-native';


const CallOutBarImage = (props) => {
    const navigation = useNavigation();

    console.log('props del mapa;', props.item);

    return (

        <Text style={{ height: 190, width: 180,position: "relative", bottom: 10 }}>
            <Image
                resizeMode="cover"
                style={{ width: 160, height: 160, }}
                source={{ uri: props.item }}
            />
        </Text>


    )
}
export default CallOutBarImage;