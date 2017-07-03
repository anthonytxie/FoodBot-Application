const burgerController = {};
const burgerDAO = require('./../../db/DAO/burgerDAO');
const {promiseHelper} = require('./..//helpers/helper-functions');


burgerController.post =  (req, res, result, session) => {
	promiseHelper(req, res, burgerDAO.post(result, session));
};


burgerController.getBurger = (req, res) => {
  promiseHelper(req, res, burgerDAO.get());
};
module.exports = burgerController;
