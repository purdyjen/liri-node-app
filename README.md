# LIRI

## What is LIRI?

- LIRI (Language Interpretation and Recognition Interface) is a command line node app that takes in certain parameters and user inputs and returns information.
- LIRI is connected to three API services: 
    - Bandsintown 
    - Spotify
    - OMDb
- Bandsintown
    - Command: concert-this (insert artist name here)
    - LIRI will return the next concert listed, providing the Venue name, location, and concert date
    ![Bandsintown](/images/01-Bandsintown.png)
- Spotify
    - Command: spotify-this-song (insert song name here)
    - LIRI will return the artist name, the song title, a preview link (if available), and the album name
    ![Spotify: Song with Preview](/images/02-spotify-song-with-preview.png)
    ![Spotify: Song without Preview](/images/03-spotify-song-without-preview.png)
    - If no song is provided by the user, LIRI will return the information for the song "The Sign" by Ace of Base
    ![Spotify: No Song](/images/04-spotify-no-song.png)
- OMDb
    - Command: movie-this (insert movie title here)
    - LIRI will return the movie title, date of release, IMDb rating, Rotten Tomatoes Rating, country produced, language(s), the short plot, and the list of main actors
      ![OMDb: With Movie](/images/05-omdb-movie.png)
    - If no movie is provided by the user, LIRI will return the information for the movie "Mr. Nobody"
      ![OMDb: No Movie](/images/06-omdb-no-movie.png)

- LIRI is also able to read the file "random.txt" and do what it says. (Command: do-what-it-says)
![Do-What-It-Says](/images/07-do-what-it-says.png)

- Finally, all commands inputted are recorded in "log.txt"

![Command Log](/images/08-command-log.png)

## Demonstration Video
[Screencastify Video] (https://drive.google.com/file/d/1lBdpSudHm8i0ncRjBA9c7XspY2RE3o4J/view)

## Technologies Used
- JavaScript
- Node.js
- APIs: 
    - Bandsintown
    - Spotify
    - OMDb
- NPMs:
    - Axios (Bandsintown, OMDb)
    - Moment.js
    - Colors
- Dotenv

## Role in Development
I coded this app in accordance with UT Austin's Online Coding Boot Camp assignment instructions. 
