// We need to provide this controller with the data we are manipulating
const movies = require("./db.json");

let globalId = 11;

module.exports = {
    getMovies: (req, res) => {
        res.status(200).send(movies);
    },
    deleteMovie: (req, res) => {
        // We need to use findIndex because the movie id is NOT the same as its index (1 off)
        let index = movies.findIndex((movie) => {
            return movie.id === +req.params.id;
        })

        movies.splice(index, 1);
        res.status(200).send(movies);
    },
    createMovie: (req, res) => {
        // console.log(req.body);

        let {title, rating, imageURL} = req.body;

        // Create a newMovie object with an id. We need this because no id is sent from the front end.
        let newMovie = {
            id: globalId,
            title, // title: title
            rating, // rating: rating
            imageURL // rating: rating
        }

        // Now that we have our reformatted movie, let's add it to our database.
        movies.push(newMovie);
        res.status(200).send(movies);

        // Increment your globalId, otherwise all your movies will have id of 11.
        globalId++;
    },
    updateMovie: (req, res) => {
        // console.log(req.params);
        // console.log(req.body);
        // Let's destructure the id and type from params and body respetively.
        let {id} = req.params; // let id = req.params.id;
        let {type} = req.body; // let type = req.body.type;

        let index = movies.findIndex((movie) => {
            return movie.id === +id;
        })

        // Example of handling errors on the back end. Using if statements, check conditions.
        if(movies[index].rating === 5 && type === "plus") {
            res.status(400).send("Cannot rate above 5");
        } else if(movies[index].rating === 1 && type === "minus") {
            res.status(400).send("Cannot rate below 1");
        } else if(type === "plus") {
            movies[index].rating++;
            res.status(200).send(movies);
        } else if(type === "minus") {
            movies[index].rating--;
            res.status(200).send(movies);
        }
    }
}