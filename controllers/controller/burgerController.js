const burgerController = {};
const burgerDAO = require('./../../db/DAO/burgerDAO');
const {promiseHelper, userPromiseHelper, orderPromiseHelper } = require('./..//helpers/helper-functions');


burgerController.postNewBurger =  (req, res) => {
	const order = req.session.order;
  const burgerObject = req.body
	orderPromiseHelper(req, res, burgerDAO.post(order._id, burgerObject));
};


burgerController.getBurger = (req, res) => {
  promiseHelper(req, res, burgerDAO.get());
};
module.exports = burgerController;
