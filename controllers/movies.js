const db = require("../db/queries");

async function getAllMovies(){
    try{
        const movies = await db.getMovies();
        console.log(movies); 
        return movies;
    }catch(error){
        console.log("Failed to get messages", error);
        throw error;
    }

}

async function insertMovie(req, res){
    try{
        const{title, description, image, genre, actors, year, rating} = req.body;
        
        // Process the form data for database
        const movie = {
            title,
            description,
            image,
            genre,
            actors: actors ? actors.split(',').map(a => a.trim()).filter(Boolean) : [],
            year: year ? parseInt(year) : null,
            rating: rating ? parseFloat(rating) : null
        };
        
        await db.insertMovie(movie);
        return res.redirect('/');
    }catch(error){
        console.error("Failed to insert movie", error)
        return res.status(500).send("Failed to insert movie")
    }
}


module.exports = { 
    getAllMovies,
    insertMovie,
}