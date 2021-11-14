import React, { Component } from 'react';
import './App.css';
import { Button, Checkbox } from '@material-ui/core';

import { getTrack, getTopArtists } from './functions.js';

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
      auth: {headers: {'Authorization': 'Bearer ' + token}},
      track: null,
    }
  }

  componentDidMount() {
    this.getNowPlaying()
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

  listUsers() {
    return <Checkbox />;
  }

  getNowPlaying(){
    getTrack('11dFghVXANMlKmJXsNCbNl', this.state.auth).then((a) => {
      this.setState({ track: a }, () => {
        console.log(this.state.track.data);
      });
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.track && <div>
          {this.state.track.data.name}
        </div>}
        <div>
          {getTopArtists(this.state.auth)}
        </div>
        {!this.state.loggedIn && <a href='http://localhost:8888' > Login to Spotify </a>}

        { this.state.loggedIn &&
          <ThemeProvider theme={theme}>
            <div>
              <Button variant='contained' color='primary' onClick={() => console.log(this.state.track ? this.state.track.data : 'yeet')}>
                Select Users
              </Button>
              <Checkbox />
            </div>
            {/* <div>
              <Button variant='contained' color='primary' onClick={() => this.getNowPlaying()}>
                Select Playlists
              </Button>
            </div> */}
          </ThemeProvider>
        }
      </div>
    );
  }
}

export default App;
