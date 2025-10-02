const express = require('express');
const path = require('path');
const app = express();

const PORT = 3000;

const messageRouter = require("./routes/messagesRoute");
const newMessageRouter = require("./routes/newMessageRouter");
const deleteMovieRouter = require("./routes/deleteMovieRoute");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Parse form data - THIS IS REQUIRED for req.body to work
app.use(express.urlencoded({ extended: true }));

app.use("/", messageRouter);
app.use("/", newMessageRouter);
app.use("/", deleteMovieRouter);

app.listen(PORT, ()=>{
    console.log(`Server is runnning on port ${PORT}`);
})