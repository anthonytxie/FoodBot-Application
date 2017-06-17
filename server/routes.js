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

//homepage 

routes.get('/', (req, res) => {
  res.send('hello welcome to the foodbot API')
})

// //User

//post with phoneNumber.. this will retreive an existing user and initialize a session for them or this will create a new user and initalize a session for them. should always be called at the beginning of a convo.
routes.post('/initializeuser', userController.initializeUser);
// retrieves current user session
routes.get('/currentusersession', userController.getCurrentSession);
//retrieves all users
routes.get('/users', userController.getAll);
//retrieves a user by phonenumber query string
routes.get('/user/:phoneNumber', userController.getByPhoneNumber);





// //Order
// grabs the user from req.session.user and creates a new order. Adds it to req.session.order. should be called when creating a new order.
routes.post('/order', orderController.postNewOrder);
//Takes user from req.session.user and looks up the most recent order. post to specifiy most recent unconfirmed or confirmed order. 
routes.post('/mostrecentorder', orderController.userPreviousOrder);
// confirms the current order on req.session.order
routes.post('/confirmorder', orderController.confirmOrder);
//unconfirms the current order on req.session.order
routes.post('/unconfirmorder', orderController.unconfirmOrder);


// get all the orders
routes.get('/orders', orderController.getAllOrders);
// get the current order on req.session.order
routes.get('/currentorder', orderController.getCurrentOrder);
// gets all orders from the user on req.session.user
routes.get('/allordersfromuser', orderController.getAllOrdersFromUser);
// deletes the most recent item added on req.session.order
routes.delete('/mostrecentitem', orderController.deleteMostRecentItem);

// //Post Foods pretty self-explanatory

// Drink
routes.post('/drink', drinkController.postNewDrink);

// //Burger
routes.post('/burger', burgerController.postNewBurger);
routes.get('/burger', burgerController.getBurger)

//Fry
routes.post('/fry', fryController.postNewFry);

//Milkshake
routes.post('/milkshake', milkshakeController.postNewMilkshake);



module.exports = routes;