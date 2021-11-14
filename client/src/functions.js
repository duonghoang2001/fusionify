import axios from "axios";

const baseURL = "https://api.spotify.com/v1/";

export function getTrack(trackID, auth) {
  return new Promise(function(resolve, reject) {
    axios.get(baseURL + 'tracks/' + trackID, auth).then(res => {
      resolve(res);
    }).catch(error => {
      reject(error);
    });
  });
}

export function getTopArtists(auth) {
  return new Promise(function(resolve, reject) {
    axios.get(baseURL + 'me/top/artists', auth).then(res => {
      resolve(res);
    }).catch(error => {
      reject(error);
    });
  });
}
