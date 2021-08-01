const express = require("express");
const path = require('path');
const userRouter = require("./routers/userRouter")


const app = express();
app.use(express.json());  //middleware needed when using POST..body parser..to facilitate req.body......
app.enable('trust proxy'); //enable proxy servers ..eg heroku uses proxy when sending request to app.
//app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views')); 
app.use(express.static(path.join(__dirname, 'public'))); //this is to serve static files which cant be served through route
app.use(express.static(path.join(__dirname, 'dataAnalysis')));

app.use("/", userRouter);


module.exports= app;