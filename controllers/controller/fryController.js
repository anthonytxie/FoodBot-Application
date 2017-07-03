const fryController = {};
const fryDAO = require('./../../db/DAO/fryDAO');
const {promiseHelper } = require('./..//helpers/helper-functions');


fryController.post =  (req, res) => {
  const order = req.session.order;
  const fryObject = req.body
  promiseHelper(req, res, fryDAO.post(order._id, fryObject));
};

module.exports = fryController;
