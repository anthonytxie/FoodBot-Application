const sessionController = {};
const sessionDAO = require('./../../db/DAO/sessionDAO');
const {promiseHelper, userPromiseHelper, orderPromiseHelper } = require('./..//helpers/helper-functions');


sessionController.initializeSession = (req, res, result, session) => {
  sessionDAO.findSessionById(session)
    .then((status) => {
      if(!status) {
        sessionDAO.createSession(session)
          .then((session) => {
            res.send(session);
          }).catch((err) => res.send(err));
      }
      else {
        sessionDAO.findSessionById(session)
          .then((session) => {
            res.send(session);
          }).catch((err) => res.send(err));
      }
    });
};


sessionController.getAllSessions = (req, res, result, session) => {
  promiseHelper(req, res, sessionDAO.findAllSessions());
};

sessionController.getSessionById = (req, res, result, session) => {
  promiseHelper(req,res,session.findSessionById(session));
};



module.exports = sessionController;
