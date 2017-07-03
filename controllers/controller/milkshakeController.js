const milkshakeController = {};
const milkshakeDAO = require('./../../db/DAO/milkshakeDAO');
const {promiseHelper} = require('./..//helpers/helper-functions');


milkshakeController.post =  (req, res, result, session) => {
  promiseHelper(req, res, milkshakeDAO.post(result, session));
};

module.exports = milkshakeController;
