const fryController = {};
const fryDAO = require('./../../db/DAO/fryDAO');
const {promiseHelper } = require('./..//helpers/helper-functions');


fryController.post =  (req, res, result, session) => {
  promiseHelper(req, res, fryDAO.post(result, session));
};

module.exports = fryController;
