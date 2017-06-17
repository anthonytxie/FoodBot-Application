const express = require('express');
const {
  userController,
  orderController,
  burgerController,
  milkshakeController,
  fryController,
  drinkController
} = require('./../controllers/index');

const routes = express();

// //User

routes.post('/initializeuser', userController.initializeUser);
routes.get('/currentusersession', userController.getCurrentSession);
routes.get('/users', userController.getAll);
routes.get('/user/:phoneNumber', userController.getByPhoneNumber);





// //Order


routes.post('/order', orderController.postNewOrder);
routes.post('/mostrecentorder', orderController.userPreviousOrder);
routes.post('/confirmorder', orderController.confirmOrder);
routes.post('/unconfirmorder', orderController.unconfirmOrder);



routes.get('/orders', orderController.getAllOrders);
routes.get('/currentorder', orderController.getCurrentOrder);
routes.get('/allordersfromuser', orderController.getAllOrdersFromUser);
routes.get('/findorder', orderController.getOrderByID);



// //Post Foods

// Drink
routes.post('/drink', drinkController.postNewDrink);

// //Burger
routes.post('/burger', burgerController.postNewBurger);

//Fry
routes.post('/fry', fryController.postNewFry);

//Milkshake
routes.post('/milkshake', milkshakeController.postNewMilkshake);



module.exports = routes;