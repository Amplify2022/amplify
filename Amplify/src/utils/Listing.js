import React, {Component} from 'react';
import {FlatList} from 'react-native';
//import styled from "styled-components/native";

import ListItem from './ListItem';

//Features

//import Header from "../features/Header";
//import Separator from "../features/Separator";

// const NoSongs = styled.Text`
//   font-size: 18px;
//   font-weight: bold;
//   color: #fff;
// `;

export default ({items, onEndReached}) => (
  <FlatList
    data={items}
    renderItem={({item}) => <ListItem item={item} />}
    keyExtractor={(item, index) => index.toString()}
    //ItemSeparatorComponent={() => <Separator />}
    onEndReached={onEndReached}
    //ListEmptyComponent={() => <NoSongs> No songs found </NoSongs>}
  />
);
