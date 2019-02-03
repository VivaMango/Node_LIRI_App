### Node_LIRI_App
#Created by VivaMango

##How it Works
LIRI is a Line Inquirer Response Interpreter bot that handles various API calls from the Command Line Interface using NodeJS

Liri uses inquirer to interpret commands.

##You can select from 4 available commands

1. "concert-this"
    LIRI will check the Bands in Town API for upcoming events from the artist input by the user.
    Date format returned is formatted via momentJS

2. "spotify-this-song"
    LIRI will check the Spotify API for the song title input by the user.
    If no song is input, LIRI returns the information for "Tokyo Drift (Fast & Furious)" by Teriyaki Boyz

3. "movie-this"
    LIRI will check the OMDB API for the movie title input by the user.
    If no movie is input, LIRI returns the information for "Tokyo Drift"

4. "do-what-it-says"
    LIRI will do what IT says.
    IT is the included text file "random.txt" which commands LIRI to return the "movie-this" result for the value in "random.txt" (default: "Tokyo Drift") 

## Log.txt
    LIRI will also create and log all search results in "log.txt" for later use.
