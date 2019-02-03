//Initial Comment

//Node Dependencies
var fs = require("fs");
var axios = require("axios");
var inquirer = require("inquirer");
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
moment().format();





function runLiriApp() {
    inquirer.prompt([
        {
            type: "list",
            name: "liriArg",
            message: "Welcome to LIRI! What would you like to search?",
            choices: ["concert-this" , "spotify-this-song" , "movie-this" , "do-what-it-says"]
        }
    ]).then(function(answers) {
        console.log(answers.liriArg)
        var liriArg = answers.liriArg
        switch (liriArg) {
            case "concert-this":
                concertThisFunc(); //working
                break;
            case "spotify-this-song":
                spotifyThisFunc();
                break;
            case "movie-this":
                movieThisFunc(); //working
                break;
            case "do-what-it-says":
                tokyoDrifter();
                break;
            default:
                console.log(`I'm sorry ${liriArg} is not a valid parameter`)
                break;
        }
    })
}
function movieCall(movieSearch) {
    axios.get(movieSearch , {
        params: {
            apikey: "trilogy"
        }
    }).then(
    function(response) {
        var resData = response.data
        var movieOutput = `Movie This Result:
        Movie Name: ${resData.Title}
        Release Year: ${resData.Year}
        IMDB Rating: ${resData.imdbRating}
        RT Rating: ${resData.Ratings[1].Value}
        Country: ${resData.Country}
        Language: ${resData.Language}
        Plot Summ: ${resData.Plot}
        Actors: ${resData.Actors}`
        console.log(movieOutput)
        fs.appendFile("log.txt" , movieOutput , function(err) {
            if (err) {
                console.log(err)
            } else {
                console.log("No Save Error")
            }
        })
        }
    );
}
function movieThisFunc() {
    inquirer.prompt([
        {
            type: "input",
            name: "movieQuery",
            message: "What Movie would you like to search?"
        }
    ]).then(function(answers) {
        var movieVal = answers.movieQuery
        if (movieVal === "") {
            movieVal = "Tokyo Drift"
            var movieArg = movieVal.split(" ").join("+")
            var movieURL = `http://www.omdbapi.com/?t=${movieArg}&y=&plot=short&`
            movieCall(movieURL);
        } else {
            var movieArg = movieVal.split(" ").join("+")
            var movieURL = `http://www.omdbapi.com/?t=${movieArg}&y=&plot=short&`
            movieCall(movieURL);
        }
        
    })
}

function concertCall(artistVal , concertSearch) {
    axios.get(concertSearch, {
        params: {
        app_id: "codingbootcamp"
        }
    }).then(function (response) {
        var eventArray = []
        response.data.forEach(function(element) {
            var momentDate = moment(element.datetime)
            var dateFormatted = momentDate.format("MM/DD/YYYY")
            var concertOutput = `${artistVal} Upcoming Show:
            City: ${element.venue.city}
            Venue Name: ${element.venue.name}
            Date (Powered by momentJS): ${dateFormatted}
            `
            console.log(concertOutput)
            eventArray.push(concertOutput)
        })
        fs.appendFile("log.txt" , eventArray , function(err) {
            if (err) {
                console.log(err)
            } else {
                console.log("No Save Error")
            }
        })
    }).catch(function (error) {
        console.log(error);
    });
}

function concertThisFunc() {
    inquirer.prompt([
        {
            type: "input",
            name: "artistQuery",
            message: "What Artist would you like to search?"
        }
    ]).then(function(answers) {
        var artistArg = answers.artistQuery
        var bandsURL = `https://rest.bandsintown.com/artists/${artistArg}/events?`;
        concertCall(artistArg , bandsURL);
    }).catch(function (error) {
        console.log (error.status)
    })
}

function spotifyCall(spotifySearch) {
    spotify.search({ 
        type: 'track', 
        query: spotifySearch 
    }).then(function(response) {
        var firstTrack = response.tracks.items[0]
        var artistArray = []
        for (var i in firstTrack.artists) {
            artistArray.push(firstTrack.artists[i].name)
        }
        var spotifyOutput = `Spotify This Song Result:
        Song: ${firstTrack.name}
        Artists: ${artistArray}
        Album: ${firstTrack.album.name}
        Preview Link: ${firstTrack.preview_url}
        `
        console.log(spotifyOutput)
        fs.appendFile("log.txt" , spotifyOutput , function(err) {
            if (err) {
                console.log(err)
            } else {
                console.log("No Save Error")
            }
        })

    }).catch(function(err) {
        console.log(err);
    });
}

function spotifyThisFunc() {
    inquirer.prompt([
        {
            type: "input",
            name: "spotifyQuery",
            message: "What Song would you like to search?"
        }
    ]).then(function(answers) {
        var spotifyVal = answers.spotifyQuery
        if (spotifyVal === "") {
            spotifyVal = "Tokyo Drift (Fast & Furious)"
            spotifyCall(spotifyVal)
        } else {
            spotifyCall(spotifyVal)
        }
    })
}

function tokyoDrifter() {
    fs.readFile("random.txt" , "utf8" , function(err , data) {
        if (err) {
            console.log(err)
        } 
        console.log(data)
        var movieArg = data.split(" ").join("+")
        var movieURL = `http://www.omdbapi.com/?t=${movieArg}&y=&plot=short&`
        movieCall(movieURL)
    })
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

// Runnin Dat Bot
runLiriApp();