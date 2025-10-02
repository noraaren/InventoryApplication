const express = require('express');
const router = express.Router();
const db = require("../controllers/movies");

router.get('/', async (req, res) => {
    try{
        const movies = await db.getAllMovies();
        res.render('main', { movies });
    }catch(error){ 
        console.error('Error fetching movies:', error);
        res.render('main', { movies: [] });
    }
});

router.post('/submit-form', db.insertMovie);

  
  



module.exports = router;