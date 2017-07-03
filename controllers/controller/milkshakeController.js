const milkshakeController = {};
const milkshakeDAO = require('./../../db/DAO/milkshakeDAO');
const {promiseHelper} = require('./..//helpers/helper-functions');


milkshakeController.post =  (req, res) => {
  const order = req.session.order;
  const milkshakeObject = req.body
  promiseHelper(req, res, milkshakeDAO.post(order._id, milkshakeObject));
};

module.exports = milkshakeController;
