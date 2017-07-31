const express = require('express');
const index = require('./routes/index');
const item = require('./routes/item');
const pug = require('pug');


const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();

// webview view engine
app.set("views", __dirname + "/../views")
app.use(express.static(__dirname +'/../public'));
app.set('view engine', 'pug');


// middleware
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(session({secret: 'cats', resave:false}));
app.use(index);
app.use(item);





module.exports = app