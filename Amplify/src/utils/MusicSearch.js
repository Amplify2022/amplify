import SearchBarScreen from './SearchBarScreen';
import React, {Component, useState} from 'react';
import Listing from './Listing';
import ListItem from './ListItem';
import ActivityIndicator from './ActivityIndicator';
import spotify_search from './spotify_search';
import spotify_token from './spotify_token';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const PAGE = 20; //20 canciones por vez

class MusicSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      offset: 0,
      query: '',
      isFetching: false,
      isEmpty: false,
      spotify_token: null,
      isTokenFetching: false,
    };
  }

  async componentDidMount() {
    await this.spotify_token();
    await this.loadNextPage();
  }

  async componentWillMount() {
    this.refreshToken();
    this.loadNextPage();
  }

  handleSearchChange = text => {
    //reset state
    this.setState(
      {
        isEmpty: false,
        query: text,
        offset: 0,
        songs: [],
      },
      () => {
        this.loadNextPage();
      },
    );
  };

  async loadNextPage() {
    const {songs, offset, query, spotify_token, isFetching, isEmpty} =
      this.state;

    this.setState({isFetching: true});

    const newSongs = await spotify_search({
      offset: offset,
      limit: PAGE,
      q: query,
    });
    console.log('new songs', newSongs);
    if (newSongs.length === 0) {
      console.log('no songs found. there might be an error');
      this.setState({isEmpty: true});
    }

    this.setState({
      isFetching: false,
      songs: [...songs, ...newSongs],
      offset: offset + PAGE,
    });
  }

  async refreshToken() {
    this.setState({
      isTokenFetching: true,
    });

    const newToken = await spotify_token();

    this.setState({
      //spotify_token = global.newToken,
      isTokenFetching: false,
    });
  }

  async handleEndReached() {
    await this.loadNextPage();
  }

  render() {
    const {query, songs, isFetching} = this.state;

    return (
      <View>
        <SearchBarScreen
          onAddText={this.handleSearchChange}
          onChange={text => this.handleSearchChange(text)}
          text={query}
        />

        {isFetching && songs.length === 0 ? (
          <ActivityIndicator />
        ) : (
          <ListItem items={songs}></ListItem>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  listItem: {
    height: 50,
    margin: 5,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    backgroundColor: 'green',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
  },
  textSong: {
    fontSize: 17,
    color: 'white',
  },
  button: {
    color: 'black',
  },
  container: {
    backgroundColor: 'black',
  },
  songText: {
    color: 'black',
  },
  like: {},
});

export default MusicSearch;
