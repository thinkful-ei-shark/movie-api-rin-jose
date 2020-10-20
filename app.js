/*

Requirements

Create a project called moviedex-api and initialize it as an Express app
to meet the following requirements.

    1. Users can search for Movies by genre, country or avg_vote
        a. The endpoint is GET /movie [X]
        b. The search options for genre, country, 
            and/or average vote are provided in query string parameters.
        c. When searching by genre, users are searching for whether 
            the Movie's genre includes a specified string. 
            The search should be case insensitive.
        d. When searching by country, users are searching for whether 
            the Movie's country includes a specified string. 
            The search should be case insensitive.
        e. When searching by average vote, users are searching for 
            Movies with an avg_vote that is greater than or equal to 
            the supplied number.
        f. The API responds with an array of full movie entries for 
            the search results
    2. The endpoint only responds when given a valid Authorization 
        header with a Bearer API token value.
    3. The endpoint should have general security in place such as best 
        practice headers and support for CORS.

*/



const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));
const movies = require('./movies-data-small');

app.get('/movie', (req, res, next) => {
    let results = movies;

    // By Genre

    const { genre = '' } = req.query;

    if (req.query.genre) {
        results = results.filter(movie =>
            movie
                .genre
                .toLowerCase()
                .includes(genre.toLowerCase())   
        );
    }

    // By Country

    const { country = '' } = req.query;

    if (req.query.country) {
        results = results.filter(movie =>
            movie
                .country
                .toLowerCase()
                .includes(country.toLowerCase())   
        );
    }
                
    // By Average Vote

    const { average = '' } = req.query;    

    if (average) {
        results = results.filter(movie =>
            movie.avg_vote >= Number(average)
        );
    }        
    
    res
        .json(results);
});


app.listen(9090, () => {
    console.log(`Server started on PORT 9090`);
});