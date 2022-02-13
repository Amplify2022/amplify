
import React, {Component, useState} from 'react';
import ListItem from './ListItem';
import SearchBarScreen from './SearchBarScreen';
import spotify_search from './spotify_search';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";



const PAGE = 15; //20 canciones por vez

class MusicSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      offset: 0,
      query: '',
      isFetching: false,
      isEmpty: false,
      spotify_token: sessionStorage.getItem("access_token"),
      isTokenFetching: false,
    };
  }

  handleSearchChange = text => {
    //reset state
    this.setState(
      {
        isEmpty: false,
        query: text.target.value,
        offset: 0,
        songs: [],
      },
      () => {
        this.loadNextPage();
      },
    );
  };

  async loadNextPage() {
    const {songs, offset, query} =
      this.state;

    this.setState({isFetching: true});
    console.log("Llegue al metodo de buscar")
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


  async handleEndReached() {
    await this.loadNextPage();
  }

  render() {
    const {query, songs, isFetching} = this.state;
    
   

    return (
      <div>
        <div className='searchDiv'>
        {/* <FontAwesomeIcon icon={faSearch} className="userIcon" /> */}
        <input type="text" className='textSearch' placeholder='Buscar tema'
          value={this.state.query}
          onChange={text => this.handleSearchChange(text)}
        />
        </div>

        {isFetching && songs.length === 0 ? (
          <div></div>
        ) : (
          <ListItem items={songs}></ListItem>
        )}
      </div>
    );
  }
}


export default MusicSearch;
