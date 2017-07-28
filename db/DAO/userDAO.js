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
      .catch(err => reject(err))
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
        else resolve(false);
      }).catch((err) => reject(err));
  });
};



module.exports = userDAO;
