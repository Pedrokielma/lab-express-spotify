require('dotenv').config();

const express = require('express');
const hbs = require('hbs');
const SpotifyWebApi = require('spotify-web-api-node');

// require spotify-web-api-node package here:

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });
  
  // Retrieve an access token
  spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));

    

// setting the spotify-api goes here:
app.get("/", (req, res) => {
    res.render("index");
    console.log(req.query)
  });




app.get('/artist-search', (req, res, next) => {
    const artist = req.query.artistName
    // console.log(artist)
    
    spotifyApi
  .searchArtists(artist)
  .then(data => {
    console.log('The received data from the API: ', data.body.artists.items);
    return res.render("artist-search-results", { artists: data.body.artists.items});
  })
  .catch(err => console.log('The error while searching artists occurred: ', err));
  });

  app.get('/albums/:artistId', (req, res, next) => {
    
      const param = req.params
      console.log(param)
    spotifyApi
    .getArtistAlbums(param)
    .then(data => {
        console.log('Artist information: ', data);
       return res.render("albums");
    })  .catch(err => console.log('The error while searching artists occurred: ', err));
  });  

/* a respeito do query, eh uma keyword apenas para formularias que dao submit?
sem um formulario srempre retorna um objetp vazio? */

 
  

// Our routes go here:

app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));