import React, { Component } from 'react';
import './App.css';
import { Button, TextField, createTheme, ThemeProvider } from '@material-ui/core';
import { getCurrentUser, createNewPlaylist, getExternalUser, getUserPlaylists, getPlaylistTracks, addTracksToPlaylist } from './functions.js';


const theme = createTheme({
  palette: {
    primary: {
      main: "#1db954"
    },
    secondary: {
      main: "#1db954"
    }
  },
  typography: {
    textAlign: 'center'
  },
});

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;

    this.state = {
      loggedIn: token ? true : false,

      auth: {headers: {'Authorization': 'Bearer ' + token}},
      track: null,
      currentUser: null,
      currentUserPlaylists: [],
      oppUserID: '',
      oppUser: null,
      oppUserPlaylists: [],
      oppUserIDValidated: false,
      tracks: [],
      tracks2: [],
      newPlaylist: null,
    }
  }

  componentDidMount() {
    this.getCurrentUser();
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


  getCurrentUser(){
    getCurrentUser(this.state.auth).then(user => {
      this.setState({ currentUser: user.data }, () => {
        console.log(this.state.currentUser);
      });
    });
  }

  getExternalUser(){
    getExternalUser(this.state.oppUserID, this.state.auth).then(user => {
      if(user != null) {
        this.setState({ oppUser: user.data }, () => {
          console.log(this.state.oppUser);
        });
      }
    });
  }

  handleTextFieldChange = (event) => {
    this.setState({ oppUserID: event.target.value });
  }

  createNewPlaylist(){
    createNewPlaylist(this.state.currentUser.id, "Fusionify with " + this.state.oppUser.display_name +" Playlist", this.state.auth).then(playlist => {
      this.setState({ newPlaylist: playlist.data });
    });

    getUserPlaylists(this.state.currentUser.id, this.state.auth).then(playlists => {
      this.setState({ currentUserPlaylists: playlists.data.items }, () => {
        this.state.currentUserPlaylists.map((playlist, index) => {
          getPlaylistTracks(playlist.id, this.state.auth).then(tracks => {
            this.setState({ tracks: tracks.data }, () => {
              console.log(tracks.data, ' 86');
              this.trackObjectToURIs();
            })
          });
        });
      });
    });

    getUserPlaylists(this.state.oppUserID, this.state.auth).then(playlists => {
      this.setState({ oppUserPlaylists: playlists.data.items }, () => {
        this.state.oppUserPlaylists.map((playlist, index) => {
          getPlaylistTracks(playlist.id, this.state.auth).then(tracks => {
            this.setState({ tracks2: tracks.data }, () => {
              console.log(tracks, ' 102');
              this.trackObjectToURIs2();
            })
          });
        });
      });
    });
  }

  trackObjectToURIs() {
    const uriTracks = this.state.tracks.items.map((track) => track.track.uri);
    console.log(uriTracks, " 114");
    this.setState({ tracks: uriTracks }, () => {
      addTracksToPlaylist(this.state.newPlaylist.id, this.state.tracks, this.state.auth).then(tracks => {
        console.log(tracks);
      });
    });
  }

  trackObjectToURIs2() {
    const uriTracks = this.state.tracks2.items.map((track) => track.track.uri);
    console.log(uriTracks, " 114");
    this.setState({ tracks2: uriTracks }, () => {
      addTracksToPlaylist(this.state.newPlaylist.id, this.state.tracks2, this.state.auth).then(tracks => {
        console.log(tracks);
      });
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.track && <div>
          {this.state.track.name}
        </div>}
        {this.state.currentUser && <div>
          {this.state.currentUser.display_name}
        </div>}
        {!this.state.loggedIn && <a href='http://localhost:8888' > Login to Spotify </a>}
      
        { this.state.loggedIn &&
          <ThemeProvider theme={theme}>
            <div textAlign='center'>
              <TextField required focused disabled={this.state.oppUserIDValidated} id='Opposite User' variant='filled' label='User to match' value={this.state.oppUserID} onChange={this.handleTextFieldChange} />
              <Button variant='contained' color='primary' onClick={() => this.getExternalUser()}>
                Find User
              </Button>
            </div>
            {this.state.oppUser && <div>{this.state.oppUser.display_name}</div>}
            <div>
              <Button variant='contained' color='primary' onClick={() => this.createNewPlaylist()}>
                Generate Playlist
              </Button>
            </div>
          </ThemeProvider>
        }
      </div>
    );
  }
}

export default App;
