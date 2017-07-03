const drinkController = {};
const drinkDAO = require('./../../db/DAO/drinkDAO');
const {promiseHelper} = require('./..//helpers/helper-functions');



drinkController.post =  (req, res, result, session) => {
  promiseHelper(req, res, drinkDAO.post(result, session));
};


module.exports = drinkController;
