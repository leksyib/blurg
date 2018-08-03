# blurg
Blurg is a simple web app that scrapes data from imdb.com when you supply the url to the imdb movie, then saves the data in mongodb.

## Setup
 - run `git clone https://github.com/leksyib/blurg.git`
 - run `yarn && cd client && yarn` to install all dependencies.
 - make a .env file and set `MONGODB_URL` to your mongodb url.
 - run `yarn dev` to get the server running locally.
 
 ## Stack
 - This project was built with React.js using create-react-app and Node.js
 - Database: Mongodb, ORM: mongoose
 
 ## API routes:
 - `POST` /movie- send url to the movie you want to scrape on imdb, it saves it in mongodb and returns it.
 - `GET /movies` - returns all movies scrapped from imdb.
 - `GET /movies/id` - returns a movie with that id from mongodb
