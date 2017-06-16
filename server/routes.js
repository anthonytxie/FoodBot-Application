const express = require('express');
const basicController = require('./../controllers/basicController');
const userController = require('./../controllers/userController');
const orderController = require('./../controllers/orderController');
const burgerController = require('./../controllers/burgerController');

const routes = express();

routes.get('/', basicController.get);



// //User

routes.post('/initializeuser', userController.initializeUser);
routes.get('/currentusersession', userController.getCurrentSession);
routes.get('/users', userController.getAll);
routes.get('/user/:phoneNumber', userController.getByPhoneNumber);





// //Order
routes.post('/mostrecentorder', orderController.userPreviousOrder);
routes.post('/order', orderController.postNewOrder);
routes.get('/allordersfromuser', orderController.getAllOrdersFromUser);
routes.get('/orders', orderController.getAllOrders);
routes.get('/currentorder', orderController.getCurrentOrder);
routes.get('/findorder', orderController.getOrderByID)
// routes.get('/currentorder', orderController.getCurrentOrder);



// //Post Foods


// //Burger
routes.get('/burger', burgerController.postNewBurger);








module.exports = routes;