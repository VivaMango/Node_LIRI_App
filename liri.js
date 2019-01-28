//Initial Comment

var a = process.argv[2];

console.log(a);

//working^^^^^


//Node Dependencies
var axios = require("axios");
require("dotenv").config();
var keys = require("./keys.js")
// var spotify = new Spotify(keys.spotify);
console.log(keys.spotify)

// axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
//   function(response) {
//     console.log("The movie's rating is: " + response.data.imdbRating);
//   }
// );


