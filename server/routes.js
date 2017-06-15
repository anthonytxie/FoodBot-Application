const express = require('express');
const basicController = require('./../controllers/basicController');
const userController = require('./../controllers/userController');
// const orderController = require('./../controllers/orderController');
// const burgerController = require('./../controllers/burgerController');

const routes = express();

routes.get('/', basicController.get);



// //User

routes.post('/user', userController.post);
routes.get('/users', userController.getAll);
routes.get('/user/:phoneNumber', userController.getByPhoneNumber);



// //Order
// routes.post('/order', orderController.postNewOrder);
// routes.get('/getMostRecentOrder', orderController.getMostRecentOrder);
// routes.get('/orders', orderController.getAllOrdersFromUser);
// routes.get('/currentorder', orderController.getCurrentOrder);



// //Post Foods


// //Burger
// routes.post('/burger', burgerController.post);









module.exports = routes;