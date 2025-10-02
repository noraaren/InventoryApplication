const express = require("express");
const router = express.Router();

router.get('/movies/new', (req, res) => {
    res.render('movieForm', {
      title: 'New Movie Form',
      formData: {},        
      errors: []           
    });
  });

module.exports = router;