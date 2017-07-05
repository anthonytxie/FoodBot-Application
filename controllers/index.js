const burgerController = require('./controller/burgerController');
const drinkController = require('./controller/drinkController');
const fryController = require('./controller/fryController');
const milkshakeController = require('./controller/milkshakeController');
const orderController = require('./controller/orderController');

const controller = {};

const actionMap = new Map();

actionMap.set('init', orderController.initializeOrder);
actionMap.set('burger', burgerController.post)
actionMap.set('milkshake', milkshakeController.post)
actionMap.set('fry', fryController.post)
actionMap.set('drink', drinkController.post)
actionMap.set('confirm', orderController.confirmOrder)
actionMap.set('unconfirm', orderController.unconfirmOrder)
actionMap.set('delete', orderController.deleteMostRecentItem)
actionMap.set('details', orderController.showOrderDetails)


controller.Post = (req, res) => {
  if (req.body && req.body.result) {
    const result = req.body.result;
    const session = req.body.sessionId;

    actionMap.get(result.action)(req,res,result,session)
  }

  else {
    res.status(400).send('400! There was no post body sent!')
  }
};

module.exports = controller;
