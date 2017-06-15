const orderController = {};
const userDAO = require('./../db/dao/userDAO');
const promiseHelper = require('./helper-functions');


orderController.postNewOrder = (req, res) => {
  const user = req.session.user;
  const order = new Order({
    _user: user._id
  });
  promiseHelper(req,res,order.save());
};