const userController = {};
const userDAO = require('./../db/dao/userDAO');
const promiseHelper = require('./helper-functions');

userController.post = (req, res) => {
  let { phoneNumber } = req.body;
  promiseHelper(req,res,userDAO.createUser(phoneNumber));
};

userController.getAll = (req, res) => {
  promiseHelper(req, res, userDAO.findAllUsers());
};

userController.getByPhoneNumber = (req, res) => {
  let { phoneNumber } = req.params;
  phoneNumber = phoneNumber.trim();
  promiseHelper(req,res,userDAO.findUserByPhoneNumber(phoneNumber));
};

module.exports = userController;
