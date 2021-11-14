import axios from "axios";

const baseURL = "https://api.spotify.com/v1/";

export function getTrack(trackID, auth) {
    axios.get(baseURL + 'tracks/' + trackID, auth).then(function (response) {
        // handle success
        console.log(response);
      })
}

export function getTopArtists(auth) {
  axios.get(baseURL + 'me/top/artists/', auth).then(function (response) {
      // handle success
      console.log(response);
    })
}
