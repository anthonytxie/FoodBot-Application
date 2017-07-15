const {Burger, Fry, Drink, Milkshake, Order, Session, User } = require('./../index');
const sessionDAO = {}


sessionDAO.findSessionById = function(sessionId) {
    return new Promise((resolve, reject) => {
        Session.findOne({session : sessionId})
        .then((session) => {
            if (!session) {
                return resolve(false);
            }
            else {
                return resolve(session);
            }
        }).catch((err) => reject(err));
    });
};




sessionDAO.findAllSessions = function() {
    return new Promise((resolve, reject) => {
        Session.find()
        .then((sessions) => {
            return resolve(sessions);
        }).catch((err) => reject(err));
    });
};


sessionDAO.createSession = function(sessionId, PSID) {
    return new Promise ((resolve, reject) => {
        const newSession = new Session ({session: sessionId});
        newSession.save()
        .then((session) => {
            User.findOneAndUpdate({PSID}, { $push: {'_sessions' : session._id}}, {new: true})
        }).catch((err) => console.log(err))
        .then((user) => {
            resolve(user)
        }).catch((err) => console.log(err))
    });
};


sessionDAO.createSession = function(PSID) {
    return new Promise((resolve, reject) => {
        const newSession = new Session ({})
    })
}


sessionDAO.sessionRenewal = function (PSID) {
    User.findOne({PSID})
        .then((user) => {
            return Session.findOne({_id: user._id}).sort({createdAt: -1})
        })
        .then((session) => {
          if ((Date.now - session.lastActiveDate) > 1800000) {
            return(sessionDAO.createSession(PSID))
          }
          else {
            return session
        }
    });
};


module.exports = sessionDAO;




