const { User, Session } = require("./../models/index");
const userDAO = {};
const mongoose = require("mongoose");
const {
  publicProfileRequest
} = require("./../../messenger-api-helpers/graphApi/publicProfile");
const { logger } = require("./../../server/logger/logger");

userDAO.createUser = function(PSID) {
  logger.info(`${PSID} userDAO createUser`);
  return new Promise((resolve, reject) => {
    publicProfileRequest(PSID)
      .then(user => {
        const newUser = new User({
          PSID,
          firstName: user.first_name,
          lastName: user.last_name,
          profilePicture: user.profile_pic
        });
        return newUser.save();
      })
      .then(user => {
        const newSession = new Session({ _user: user._id });
        return newSession.save();
      })
      .then(session => {
        return User.findOneAndUpdate(
          { PSID },
          { $push: { _sessions: session._id } },
          { new: true }
        ).populate("_sessions");
      })
      .then(user => {
        resolve(user);
      })
      .catch(err => {
        logger.error(`${PSID} userDAO createUser`, { err });
        reject(err);
      });
  });
};

userDAO.isUserCreated = function(PSID) {
  logger.info(`${PSID} userDAO isUserCreated`);

  return new Promise((resolve, reject) => {
    User.findOne({ PSID })
      .then(user => {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => {
        logger.error(`${PSID} userDAO isUserCreated`, { err });
        reject(err);
      });
  });
};

userDAO.updateEmail = function(userId, email) {
  logger.info(`${userId} userDAO updateEmail`);
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate(
      { _id: userId },
      {
        $addToSet: {
          emails: email
        }
      },
      { new: true }
    )
      .then(user => {
        resolve(user);
      })
      .catch(err => {
        logger.error(`${userId} userDAO updateEmail`, { err });
        reject(err);
      });
  });
};

userDAO.updatePhoneNumber = (userId, phoneNumber) => {
  logger.info(`${userId} userDAO updatePhoneNumber`);
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate(
      { _id: userId },
      {
        $addToSet: {
          phoneNumbers: phoneNumber
        }
      },
      { new: true }
    )
      .then(user => {
        resolve(user);
      })
      .catch(err => {
        logger.error(`${userId} userDAO updatePhoneNumber`, { err });
        reject(err);
      });
  });
};

userDAO.updateAddress = (userId, address, roomNumber) => {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate(
      { _id: userId },
      {
        $set: { address, roomNumber }
      },
      { new: true }
    )
      .then(user => {
        resolve(user);
      })
      .catch(err => {
        logger.error(`${userId} userDAO updateAddress`, { err });
        reject(err);
      });
  });
};

userDAO.updateBringgId = (userId, bringgId) => {
  logger.info("userDAO updateBringgId");
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate(
      { _id: userId },
      {
        $set: { "integrationIds.bringgId": bringgId }
      },
      { new: true }
    )
      .then(user => {
        resolve(user);
      })
      .catch(err => {
        logger.error(`userDAO updateBringgId`, { err });
        reject(err);
      });
  });
};

module.exports = userDAO;
