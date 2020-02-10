require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var moment = require("moment");
var colors = require("colors");
var fs = require("fs");
var artist = process.argv.slice(3).join("+");
var song = process.argv.slice(3).join("+");
var title = process.argv.slice(3).join("+");

function spotifyCommands() {
switch(command) {
    case "concert-this":
        concert();
        break;
    case "spotify-this-song":
        spotifyThis();
        break;
    case "movie-this":
        movie();
        break;
    case "do-what-it-says":
        doWhat();
        break;
}
}

function concert() {
    var bandsUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
   
axios.get(bandsUrl).then(
    function(response) {
        console.log("");
        console.log("Bandsintown:".underline.red);
        console.log("Venue: ".cyan + response.data[0].venue.name);
        console.log("Location: ".cyan + response.data[0].venue.city + ", " + response.data[0].venue.region + " (" + response.data[0].venue.country + ")");
        console.log("Date: ".cyan + moment(response.data[0].datetime).format("MM/DD/YYYY"));
        console.log("");
    },

    function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
    
    });
}

function spotifyThis() {
    
    if (song!=0) {
    spotify.search({ type: 'track', query: song, limit: 1}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        } 
    console.log("");
    console.log("Spotify:".underline.cyan);
    console.log("Artist: ".cyan + data.tracks.items[0].artists[0].name);
    console.log("Song: ".cyan + "\""+data.tracks.items[0].name+"\"");
    console.log("Link: ".cyan + data.tracks.items[0].artists[0].external_urls.spotify);
    console.log("Album: ".cyan + data.tracks.items[0].album.name);
    console.log("");
    });
} else {
    song = "The+Sign"
    spotify.search({ type: 'track', query: song, limit: 1}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        } 
    console.log("");
    console.log("Spotify:".underline.cyan);
    console.log("Artist: ".cyan + data.tracks.items[0].artists[0].name);
    console.log("Song: ".cyan + "\""+data.tracks.items[0].name+"\"");
    console.log("Link: ".cyan + data.tracks.items[0].artists[0].external_urls.spotify);
    console.log("Album: ".cyan + data.tracks.items[0].album.name);
    console.log("");
});
}
}

function movie() {
    var omdbUrl = "http://www.omdbapi.com/?apikey=trilogy&t=" + title;

    if(title.length!=0){
    axios.get(omdbUrl).then(
        function(response) {
            console.log("");
            console.log("OMDb Info:".underline.red);
            console.log("Title: ".cyan + response.data.Title);
            console.log("Released: ".cyan + response.data.Released);
            console.log("IMDb Rating: ".cyan + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: ".cyan + response.data.Ratings[1].Value);
            console.log("Produced in: ".cyan + response.data.Country);
            console.log("Language: ".cyan + response.data.Language);
            console.log("Plot: ".cyan + response.data.Plot);
            console.log("Actors: ".cyan + response.data.Actors);
            console.log("");
        },
        function(error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an object that comes back with details pertaining to the error that occurred.
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", error.message);
            }
            console.log(error.config);
        
        });
    } else {
        title = "mr+nobody";
        omdbUrl = "http://www.omdbapi.com/?apikey=trilogy&t=" + title;
        axios.get(omdbUrl).then(
            function(response) {
                // console.log(response);
                console.log("");
                console.log("OMDb Info:".underline.red);
                console.log("Title: ".cyan + response.data.Title);
                console.log("Released: ".cyan + response.data.Released);
                console.log("IMDb Rating: ".cyan + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: ".cyan + response.data.Ratings[1].Value);
                console.log("Produced in: ".cyan + response.data.Country);
                console.log("Language: ".cyan + response.data.Language);
                console.log("Plot: ".cyan + response.data.Plot);
                console.log("Actors: ".cyan + response.data.Actors);
                console.log("");
            },
            function(error) {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an object that comes back with details pertaining to the error that occurred.
                  console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log("Error", error.message);
                }
                console.log(error.config);
            
            });

}}

function doWhat() {


var fs = require("fs");


fs.readFile("random.txt", "utf8", function(error, data) {

  if (error) {
    return console.log(error);
  }
  
  console.log(data);
  var dataArr = data.split(",");
  console.log(dataArr);
  command = dataArr[0];
  artist = dataArr[1];
  song = dataArr[1];
  title = dataArr[1];

  switch(command) {
    case "concert-this":
        concert();
        break;
    case "spotify-this-song":
        spotifyThis();
        break;
    case "movie-this":
        movie();
        break;
    case "do-what-it-says":
        doWhat();
        break;
}
});
}


function append() {
  
    var text = "\n" + process.argv.slice(2).join(" ");
    fs.appendFile("log.txt", text, function(err) {
    
      if (err) {
        console.log(err);
      }
    
      else {
        console.log("Content Added!");
        
      }
    
    });
}

append();
spotifyCommands();