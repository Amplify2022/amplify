import React, {Component, useState} from 'react';
import {SearchBar} from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';

const SearchBarScreen = props => {
  const [newText, setNewText] = useState('');

  return (
    <View>
      {/* <SearchBar
        placeholder="Busca tu tema preferido!"
        onChangeText={(newText) => props.onAddText(newText)}
        //onChangeText = {props.onAddText.bind(text)}
        value={newText}
      /> */}

      <TextInput
        onChangeText={newText => props.onAddText(newText)}
        underlineColorAndroid="#f000"
        placeholder="Busca tu tema"
        placeholderTextColor="#8b9cb5"
        autoCapitalize="sentences"
        returnKeyType="next"
        onSubmitEditing={() =>
          emailInputRef.current && emailInputRef.current.focus()
        }
        blurOnSubmit={false}
      />
    </View>
  );
};

export default SearchBarScreen;
