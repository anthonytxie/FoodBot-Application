const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();


//Middleware
app.use(bodyParser.json())
app.use(session({secret: 'cats', resave:false}))
app.use(routes)





module.exports = app