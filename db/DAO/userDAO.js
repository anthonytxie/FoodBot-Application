const { Order, User, Session, Burger, Drink, Side } = require('./../models/index');
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

module.exports = userDAO;
