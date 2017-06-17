const drinkController = {};
const drinkDAO = require('./../../db/DAO/drinkDAO');
const {promiseHelper, userPromiseHelper, orderPromiseHelper } = require('./..//helpers/helper-functions');



drinkController.postNewDrink =  (req, res) => {
  const order = req.session.order;
  const drinkObject = req.body
  orderPromiseHelper(req, res, drinkDAO.post(order._id, drinkObject));
};


module.exports = drinkController;
