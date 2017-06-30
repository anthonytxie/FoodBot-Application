const burgerController = require('./controller/burgerController');
const drinkController = require('./controller/drinkController');
const fryController = require('./controller/fryController');
const milkshakeController = require('./controller/milkshakeController');
const orderController = require('./controller/orderController');
const sessionController = require('./controller/sessionController');

const controller = {};





const actionMap = new Map();
actionMap.set('initializeSession', sessionController.initializeSession);
actionMap.set('getAllSessions', sessionController.getAllSessions);
actionMap.set('getSessionById', sessionController.getSessionById);




// actionMap.set('initializeUser', userController.initializeUser);
// actionMap.set('initializeUser', userController.initializeUser);
// actionMap.set('initializeUser', userController.initializeUser);
// actionMap.set('initializeUser', userController.initializeUser);
// actionMap.set('initializeUser', userController.initializeUser);
// actionMap.set('initializeUser', userController.initializeUser);
// actionMap.set('initializeUser', userController.initializeUser);
// actionMap.set('initializeUser', userController.initializeUser);
// actionMap.set('initializeUser', userController.initializeUser);
// actionMap.set('initializeUser', userController.initializeUser);
// actionMap.set('initializeUser', userController.initializeUser);
// actionMap.set('initializeUser', userController.initializeUser);
// actionMap.set('initializeUser', userController.initializeUser);
// actionMap.set('initializeUser', userController.initializeUser);











controller.Post = (req, res) => {
  if (req.body && req.body.result) {
    const result = req.body.result;
    const session = req.body.sessionId;
  }




  else {
    res.status(400).send('400! There was no post body sent!')
  }
};
