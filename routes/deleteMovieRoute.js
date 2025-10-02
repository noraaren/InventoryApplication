const express = require("express");
const router = express.Router();
const db = require("../controllers/movies");

router.get('/delete-movie', async (req, res) => {
    try {
        const movies = await db.getAllMovies();
        res.render('deleteMovie', {
            title: 'Delete Movie',
            movies: movies
        });
    } catch (error) {
        console.error('Error fetching movies for delete page:', error);
        res.status(500).send('Error fetching movies for delete page');
    }
});

router.post('/delete-movie', db.deleteMovie);

module.exports = router;