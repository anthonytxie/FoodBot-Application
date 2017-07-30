const { Session, User } = require("./../models/index");

const sessionDAO = {};

sessionDAO.isSessionActive = function(PSID) {
    return new Promise((resolve, reject) => {
        User.findOne({ PSID })
            .then(user => {
                if (user) {
                    resolve(false);
                } else
                    return Session.findOne({ _user: user.id }).sort({
                        createdAt: -1
                    });
            })
            .then(session => {
                if (
                    session.isActive &&
                    Date.now() - session.lastActiveDate > 180000
                ) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
    });
};


sessionDAO.findSessionById = function(sessionId) {
    return new Promise((resolve, reject) => {
        Session.findOne({ session: sessionId })
            .then(session => {
                if (!session) {
                    return resolve(false);
                } else {
                    return resolve(session);
                }
            })
            .catch(err => reject(err));
    });
};

sessionDAO.findAllSessions = function() {
    return new Promise((resolve, reject) => {
        Session.find()
            .then(sessions => {
                return resolve(sessions);
            })
            .catch(err => reject(err));
    });
};

sessionDAO.createSession = function(PSID) {
    return new Promise((resolve, reject) => {
        User.findOne({ PSID })
            .then(user => {
                const newSession = new Session({ _user: user._id });
                return newSession.save();
            })
            .catch(err => reject(err))
            .then(session => {
                return User.findOneAndUpdate(
                    { PSID },
                    { $push: { _sessions: session._id } },
                    { new: true }
                )
                    .then(() => {
                        resolve(session);
                    })
                    .catch(err => reject(err));
            })
            .catch(err => reject(err));
    });
};

sessionDAO.sessionRenewal = function(PSID) {
    return new Promise((resolve, reject) => {
        User.findOne({ PSID })
            .then(user => {
                return Session.findOne({ _user: user._id }).sort({
                    createdAt: -1
                });
            })
            .catch(err => reject(err))
            .then(session => {
                if ((Date.now() - session.lastActiveDate > 180000) || (!session.isActive)) {
                    return Session.findOneAndUpdate(
                        { _id: session._id },
                        { $set: { isActive: false } },
                        { new: true }
                    ).then(() => {
                        return sessionDAO.createSession(PSID);
                    });
                } else {
                    return Session.findOneAndUpdate(
                        { _id: session._id },
                        { $set: { lastActiveDate: Date.now() } },
                        { new: true }
                    );
                }
            })
            .then(session => resolve(session))
            .catch(err => reject(err));
    });
};

sessionDAO.closeSession = function(PSID) {
    return new Promise((resolve, reject) => {
        User.findOne({ PSID })
            .then(user => {
                return Session.findOne({ _user: user._id }).sort({
                    createdAt: -1
                });
            })
            .catch(err => reject(err))
            .then(session => {
                return Session.findOneAndUpdate(
                    { _id: session._id },
                    { $set: { isActive: false } },
                    { new: true }
                );
            })
            .then(session => {
                resolve(session);
            })
            .catch(err => reject(err));
    });
};

module.exports = sessionDAO;