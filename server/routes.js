const express = require('express');
const basicController = require('./../controllers/basicController');

const routes = express();

routes.get('/', basicController.get);


module.exports = routes;