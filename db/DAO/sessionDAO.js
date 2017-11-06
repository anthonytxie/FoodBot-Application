const { Session, User } = require("./../models/index");
const sessionDAO = {};
const sessionTimeOutTime = 1800000; // change this to half an hour later
const { logger } = require("./../../server/logger/logger");

sessionDAO.isSessionActive = function(PSID) {
    logger.info(`${PSID} sessionDAO isSessionActive`);
    return new Promise((resolve, reject) => {
        User.findOne({ PSID })
            .then(user => {
                if (!user) {
                    resolve(false);
                } else {
                    return Session.findOne({ _user: user.id }).sort({
                        createdAt: -1
                    });
                }
            })
            .then(session => {
                if (
                    session.isActive &&
                    Date.now() - session.lastActiveDate < sessionTimeOutTime
                ) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch(err => {
                logger.error(`${PSID} sessionDAO isSessionActive`, { err });
                reject(err);
            });
    });
};

sessionDAO.createSession = function(PSID) {
    logger.info(`${PSID} sessionDAO createSession`);
    return new Promise((resolve, reject) => {
        User.findOne({ PSID })
            .then(user => {
                const newSession = new Session({ _user: user._id });
                return newSession.save();
            })
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
            .catch(err => {
                logger.error(`${PSID} sessionDAO createSession`, { err });
                reject(err);
            });
    });
};

sessionDAO.renewSession = function(PSID) {
    return new Promise((resolve, reject) => {
        logger.info(`${PSID} sessionDAO renewSession`);
        User.findOne({ PSID })
            .then(user => {
                if (user) {
                    return Session.findOne({ _user: user._id }).sort({
                        createdAt: -1
                    });
                } else {
                    reject("there is no user");
                }
            })
            .then(session => {
                if (
                    Date.now() - session.lastActiveDate > sessionTimeOutTime ||
                    !session.isActive
                ) {
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
            .catch(err => {
                logger.error(`${PSID} sessionDAO createSession`, { err });
                reject(err);
            });
    });
};

sessionDAO.closeSession = function(sessionId) {
    logger.info(`${sessionId} sessionDAO closeSession`);
    return new Promise((resolve, reject) => {
        Session.findOneAndUpdate(
            { _id: sessionId },
            { $set: { isActive: false } },
            { new: true }
        )
            .then(session => {
                resolve(session);
            })
            .catch(err => {
                logger.error(`${sessionId} sessionDAO createSession`, { err });
                reject(err);
            });
    });
};

module.exports = sessionDAO;
