const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();


//Middleware
app.use(bodyParser.json())
app.use(routes)

module.exports = app