const burgerController = {};
const burgerDAO = require('./../../db/dao/burgerDAO');
const {promiseHelper, userPromiseHelper, orderPromiseHelper } = require('./..//helpers/helper-functions');


burgerController.postNewBurger =  (req, res) => {
	const order = req.session.order;
  const burgerObject = req.body
	orderPromiseHelper(req, res, burgerDAO.post(order._id, burgerObject));
};


module.exports = burgerController;
