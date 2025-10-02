const pool = require("./pool");
async function getMovies(){
    const {rows} = await pool.query(`SELECT * FROM movies`);
    return rows
}

async function insertMovie(movie){
    const {image, description, title, genre, actors, year, rating} = movie;
    const query = `
        INSERT INTO movies (Image, Description, Title, Genre, Actors, Year, Rating) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
    `;
    const values = [image, description, title, genre, actors, year, rating];
    const {rows} = await pool.query(query, values);
    return rows[0];
}

async function deleteMovie(movie){
    const {MovieID} = movie;
    const query = `
        DELETE FROM movies WHERE MovieID = $1
        RETURNING *
    `;
    const values = [MovieID];
    const {rows} = await pool.query(query, values);
    return rows[0];
}

module.exports = {
    getMovies,
    insertMovie,
    deleteMovie,
}
