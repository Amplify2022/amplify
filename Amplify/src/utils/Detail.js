import React from 'react';
import {View, Label, Text} from 'react-native';

const Detail = ({album, artist, name}) => {
  return (
    <View>
      <View>
        <Text>
          <Img src={album.images[0].url} alt={name}></Img>
        </Text>
      </View>
      <View>
        <Text>
          <Label htmlFor={name}>{name}</Label>
        </Text>
      </View>
      <View>
        <Text>
          <Label htmlFor={artist[0].name}>{artist[0].name}</Label>
        </Text>
      </View>
    </View>
  );
};

export default Detail;
