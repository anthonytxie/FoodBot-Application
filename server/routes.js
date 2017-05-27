const express = require('express');
const basicController = require('./../controllers/basicController');
const userController = require('./../controllers/userController');

const routes = express();

routes.get('/', basicController.get);
routes.post('/user', userController.post);
routes.get('/users', userController.get);


module.exports = routes;