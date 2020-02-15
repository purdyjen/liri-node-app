//dependencies
require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var colors = require("colors");
var fs = require("fs");

//input variables
var command = process.argv[2];
var artist = process.argv.slice(3).join("+");
var song = process.argv.slice(3).join("+");
var title = process.argv.slice(3).join("+");

//function to identify and run requested function
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

//queries bandsintown API for concert information
function concert() {
    var bandsUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
   
axios.get(bandsUrl).then(
    function(response) {
        console.log("");
        console.log("Bandsintown:".underline.cyan);
        console.log("Venue: ".cyan + response.data[0].venue.name);
        console.log("Location: ".cyan + response.data[0].venue.city + ", " + response.data[0].venue.region + " (" + response.data[0].venue.country + ")");
        console.log("Date: ".cyan + moment(response.data[0].datetime).format("MM/DD/YYYY"));
        console.log("");
    },

    //I didn't write this part...or any of the error parts. :-)
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

//queries Spotify API for song information
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
    
    //not every song has a preview link available 
          //(it's dependent upon the market availability in a specific country)
    //function checks value of preview_url
          //if not "null", then prints the value to screen
          //if "null", then ignores request and prints "No preview link available."
    if (data.tracks.items[0].preview_url != null) {
      console.log("Preview Link: ".cyan + data.tracks.items[0].preview_url);
    } else {
      console.log("Preview Link: ".cyan + "No preview link available.");
    }
   
    console.log("Album: ".cyan + data.tracks.items[0].album.name);
    console.log("");
    });
    //if no user input, then prints default song (which has a preview link, so that function is skipped)
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
    console.log("Preview Link: ".cyan + data.tracks.items[0].preview_url);
    console.log("Album: ".cyan + data.tracks.items[0].album.name);
    console.log("");
});
}
}

//queries omdb API for movie information
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
        //if no user input, then prints default movie
    } else {
        title = "mr+nobody";
        omdbUrl = "http://www.omdbapi.com/?apikey=trilogy&t=" + title;
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
                console.log("* If you haven't watched \"Mr. Nobody,\" then you should: <http://www.imdb.com/title/tt0485947/>".cyan);
                console.log("* It's on Netflix!".cyan);
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

//reads text in random.txt file and does what it says
function doWhat() {

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
}
});
}

//writes every command input into log.txt
function append() {
    var text = "\n" + process.argv.slice(2).join(" ");
    fs.appendFile("log.txt", text, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Content Added!"); 
      }
    });
}

//these functions run every time the file is requested
append();
spotifyCommands();