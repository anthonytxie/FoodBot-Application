const express = require('express');
const basicController = require('./../controllers/basicController');
const userController = require('./../controllers/userController');
const orderController = require('./../controllers/orderController');

const routes = express();

routes.get('/', basicController.get);




//User

routes.post('/user', userController.post);
routes.get('/users', userController.get);
routes.get('/userSession', userController.getUserSession);



//Order
routes.post('/order', orderController.post);
routes.get('/getMostRecentOrder', orderController.getMostRecentOrder)

module.exports = routes;