const milkshakeController = {};
const milkshakeDAO = require('./../../db/dao/milkshakeDAO');
const {promiseHelper, userPromiseHelper, orderPromiseHelper } = require('./..//helpers/helper-functions');


milkshakeController.postNewMilkshake =  (req, res) => {
  const order = req.session.order;
  const milkshakeObject = req.body
  orderPromiseHelper(req, res, milkshakeDAO.post(order._id, milkshakeObject));
};

module.exports = milkshakeController;
