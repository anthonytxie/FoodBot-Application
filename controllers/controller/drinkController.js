const drinkController = {};
const drinkDAO = require('./../../db/DAO/drinkDAO');
const {promiseHelper} = require('./..//helpers/helper-functions');



drinkController.post =  (req, res) => {
  const order = req.session.order;
  const drinkObject = req.body
  promiseHelper(req, res, drinkDAO.post(order._id, drinkObject));
};


module.exports = drinkController;
