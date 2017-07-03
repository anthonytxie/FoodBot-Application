const sessionController = {};
const sessionDAO = require('./../../db/DAO/sessionDAO');
const {promiseHelper} = require('./..//helpers/helper-functions');


sessionController.getAllSessions = (req, res, result, session) => {
  promiseHelper(req, res, sessionDAO.findAllSessions());
};

sessionController.getSessionById = (req, res, result, session) => {
  promiseHelper(req,res,session.findSessionById(session));
};



module.exports = sessionController;
