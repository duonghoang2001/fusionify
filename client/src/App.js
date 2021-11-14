import React, { Component } from 'react';

import './App.css';
import { Button } from '@material-ui/core';

import { getTopArtists, getTrack } from "./functions.js";
import { createTheme, ThemeProvider } from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      main: "#1db954"
    },
    secondary: {
      main: "#1db954"
    }
  }
});

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
  
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' },
      auth: {headers: {'Authorization': 'Bearer ' + token}}
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying(){
 
  }

  render() {
    return (
      <div className="App">
        {<div>
          {getTrack('11dFghVXANMlKmJXsNCbNl', this.state.auth)}
        </div>}
        {<div>
          {getTopArtists(this.state.auth)}
        </div>}
        {!this.state.loggedIn && <a href='http://localhost:8888' > Login to Spotify </a>}
        <div>
          Now Playing: { this.state.nowPlaying.name }
        </div>
        <div>
          <img src={this.state.nowPlaying.albumArt} alt="no cover" style={{ height: 150 }}/>
        </div>
        { this.state.loggedIn &&
          <ThemeProvider theme={theme}>
            <div>
              <Button variant='contained' color='primary' onClick={() => this.getNowPlaying()}>
                Select Users
              </Button>
            </div>
            <div>
              <Button variant='contained' color='primary' onClick={() => this.getNowPlaying()}>
                Select Playlists
              </Button>
            </div>
            <button onClick={() => this.getNowPlaying()}>
              Check Now Playing
            </button>
          </ThemeProvider>
        }
      </div>
    );
  }
}

export default App;
