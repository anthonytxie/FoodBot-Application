const fryController = {};
const fryDAO = require('./../../db/DAO/fryDAO');
const {promiseHelper, userPromiseHelper, orderPromiseHelper } = require('./..//helpers/helper-functions');


fryController.postNewFry =  (req, res) => {
  const order = req.session.order;
  const fryObject = req.body
  orderPromiseHelper(req, res, fryDAO.post(order._id, fryObject));
};

module.exports = fryController;
