const { User, Session } = require('./../models/index');
const userDAO = {};

userDAO.createUser = function(PSID) {
  return new Promise((resolve, reject) => {
    const newUser = new User({ PSID });
    newUser
      .save()
      .then(user => {
        const newSession = new Session({ _user: user._id });
        return newSession.save();
      })
      .then(session => {
        return User.findOneAndUpdate(
          { PSID },
          { $push: { _sessions: session._id } },
          { new: true }
        );
      })
      .catch(err => reject(err))
      .then(user => {
        resolve(user);
      });
  });
};

userDAO.isUserCreated = function(PSID) {
  return new Promise((resolve, reject) => {
    User.findOne({PSID})
      .then((user) => {
        if (user) {
          resolve(true);
        }
        else {
          resolve(false);
        }
      }).catch((err) => reject(err));
  });
};
userDAO.updateEmail = function(userId, email) {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate(
      { _id: "598f70acdc3e7a0011ddec09"},
      {
        $set: {
          email: email
        }
      },
      { new: true }
    )
      .then(user => {
        resolve(user);
      })
      .catch(err => reject(err));
  });
};


module.exports = userDAO;
