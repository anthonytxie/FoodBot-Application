const {Burger, Fry, Drink, Milkshake, Order, Session } = require('./../index');
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


sessionDAO.createSession = function(sessionId) {
    return new Promise ((resolve, reject) => {
        const newSession = new Session ({session: sessionId});
        newSession.save()
            .then((session) => {
                return session
            }).catch((err) => reject(err))
    });
};



module.exports = sessionDAO;




