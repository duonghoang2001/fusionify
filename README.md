# Fusionify
This Repo is the result of a tutorial that teaches how to use Spotify's API with react.
It's a simple app that allows users to create a fusion playlist combining your and your friends' favorite songs on Spotify.
There are two parts to it, the auth-server, and the client. 

## Getting Started

### 1) Create an App
- Visit https://developer.spotify.com/ 
- Log in and create an app
- Enter http//localhost:8888/callback as the redirect uri
- Save your changes
- Copy down the following: Redirect uri, client id, client secret


### 2)  Start Auth Server
- Navigate to the auth-server directory `cd auth-server`
- Install the dependencies `npm install`
- Paste in the redirect uri, client id, and client secret you copied in step 1
- Run the Server `node authorization_code/app.js`

### 3)  Start Client
- Navigate to the auth-server directory `cd client`
- Install the dependencies `npm install`
- Run the Server `npm start`

### 4)  Use the App
- You will be directed to the website http://localhost:3000 automatically once you have both the server and the client running
- Click 'Log in with Spotify' and log in
- Input your friend's Spotify username and click find user to verify 
- Click 'Generate Playlist' button to generate a fusion playlist of you and your friend on Spotify

