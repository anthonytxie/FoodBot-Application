const {Burger, Fry, Drink, Milkshake, Order, Session, User } = require('./../index');
const userDAO = {};


userDAO.createUser = function(PSID) {
    return new Promise ((resolve, reject) => {
        const newUser = new User ({PSID});
        newUser.save()
            .then((user) => {
              const newSession = new Session({_user: user._id})
              return newSession.save()
            }).catch((err) => reject(err))
            .then((session) => {
              resolve(session)
            })
    });
};




module.exports = userDAO;