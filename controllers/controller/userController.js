const userController = {};
const userDAO = require('./../../db/DAO/userDAO');
const {promiseHelper, userPromiseHelper, orderPromiseHelper } = require('./..//helpers/helper-functions');

userController.initializeUser = (req, res) => {
  let { phoneNumber } = req.body;
  userDAO.findUserByPhoneNumber(phoneNumber)
  	.then((status) => {
  		if(!status) {
  			userDAO.createUser(phoneNumber)
  				.then((user) => {
  					req.session.user = user;
  					res.send(user);
  				}).catch((err) => res.send(err));
  		}
  		else {
  			userDAO.findUserByPhoneNumber(phoneNumber)
  				.then((user) => {
  					req.session.user = user;
  					res.send(user);
  				}).catch((err) => res.send(err));
  		}
  	});
};


userController.getUserCurrentSession = (req, res) => {
	if (!req.session.user) {
		return res.send('no user session currently');
	}
	else {
		return res.send(req.session.user);
	}
};

userController.getAllUsers = (req, res) => {
  promiseHelper(req, res, userDAO.findAllUsers());
};

userController.getUserByPhoneNumber = (req, res) => {
  let { phoneNumber } = req.params;
  phoneNumber = phoneNumber.trim();
  promiseHelper(req,res,userDAO.findUserByPhoneNumber(phoneNumber));
};



module.exports = userController;
