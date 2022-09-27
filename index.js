const express = require("express");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs');
var User = require('./models/user');
//express setting
app.set("views", "./views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const router = require('./router/main')(app, fs, User);

//DB configuration
var db = mongoose.connection;
db.on('error', err => {
  console.log(err);
});
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});
mongoose.connect('mongodb://localhost/test');

//server starts
var server = app.listen(3000, function(){
  console.log("서버 시작: http://127.0.0.1:3000/");
});