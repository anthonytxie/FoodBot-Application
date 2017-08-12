// MODULES
const express = require('express');
const pug = require('pug');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const stripe = require('stripe')("sk_test_wGIrSvj5T4LPKJe603wPoLhw")

// ROUTES
const burger = require('./routes/burger');
const combo = require('./routes/combo');
const receipt = require('./routes/receipt');
const webhook = require('./routes/webhook');
const cashier = require('./routes/cashier');

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
app.use(cashier);





module.exports = app