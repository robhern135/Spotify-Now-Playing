import React, { Component } from 'react';

import Placeholder from'../img/placeholder_album_artwork.jpg';
import SpotifyLogo from'../img/spotify-logo.png';

import Spotify from 'spotify-web-api-js';
const spotifyWebApi = new Spotify();

// import Authorizer from '../auth-server/authorization_code/app.js';

class Home extends Component {
    constructor(){
        super();
        const params = this.getHashParams();
    
        this.state = {
          loggedIn: params.access_token ? true : false,
          user: "Unknown",
          nowPlaying: {
            name: "Click 'Refresh Now Playing' to check",
            image: Placeholder
          }
        }
        if (params.access_token){
          spotifyWebApi.setAccessToken(params.access_token)
        }
      }
      getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
      }
      getNowPlaying(){
        spotifyWebApi.getMyCurrentPlaybackState()
          .then((response) =>{
            console.log(response);
            this.setState({
              nowPlaying: {
                name: response.item.name,
                image: response.item.album.images[0].url,
                album: response.item.album.name,
                artist: response.item.artists[0].name,
                artist_url: response.item.artists[0].external_urls.spotify
              }
            })
          })
      }
  render() {
    return (
        <div className="Home">
        <div className="login__header">
        <img className="spotify-logo" src={SpotifyLogo} alt="Spotify Logo"/> <h1>Currently Playing</h1>
        { this.state.loggedIn ?
          <div className="logged-in">You are logged in</div> : 
          <a href="http://localhost:8888">
            <button>Login with Spotify</button>
          </a>
        } 
        </div>
        <div className="container now-playing">
        { this.state.loggedIn ?
          <div className="now-playing card">
          <h2 className="now-playing header">Now Playing: <span> { this.state.nowPlaying.name }</span></h2>
          <img className="now-playing artwork" src={ this.state.nowPlaying.image } alt={ this.state.nowPlaying.name } />
          <h3 className="now-playing artist"><a href={this.state.nowPlaying.artist_url} target="_blank">
          { this.state.nowPlaying.artist }</a>
          </h3>
          <h3 className="now-playing album">{ this.state.nowPlaying.album }</h3>
          <button className="now-playing button white" onClick={() => this.getNowPlaying() }>
            Refresh Now Playing
          </button>
        </div> : 
          <div className="login__continue"><h2>Please Login Above to Continue</h2></div>
        } 
        </div>
        <div className="footer">
          <h4>Made by <a href="https://robhern.co.uk">Rob Hern</a></h4>
          <h4><a href="https://itunes.apple.com/app/spotify-music/id324684580">Install Spotify</a><a href="spotify:open">Open Spotify</a></h4>
          </div>
      </div>
    );
  }
}

export default Home;