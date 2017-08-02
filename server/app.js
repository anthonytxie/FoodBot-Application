const express = require('express');
const pug = require('pug');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');


// ROUTES
const burger = require('./routes/burger');
const combo = require('./routes/combo');
const receipt = require('./routes/receipt');
const webhook = require('./routes/webhook');


// APP
const app = express();

// webview view engine
app.set("views", __dirname + "/../views")
app.use(express.static(__dirname +'/../public'));
app.set('view engine', 'pug');


// Library Middleware
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Route Middleware
app.use(burger);
app.use(combo);
app.use(receipt);
app.use(webhook);





module.exports = app