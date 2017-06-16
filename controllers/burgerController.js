const burgerController = {};
const burgerDAO = require('./../db/dao/burgerDAO');
const promiseHelper = require('./helper-functions');



burgerController.postNewBurger =  (req, res) => {
	const order = req.session.order;
	promiseHelper(req, res, burgerDAO.post(order._id));
};

module.exports = burgerController;
