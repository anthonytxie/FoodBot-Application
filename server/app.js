const express = require('express');
const index = require('./routes/index');
const item = require('./routes/item');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();


//Middleware
app.use(bodyParser.json())
app.use(session({secret: 'cats', resave:false}))
app.use(index)
app.use(item)





module.exports = app