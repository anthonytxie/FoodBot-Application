const {Burger, Fry, Drink, Milkshake, Order, User } = require('./../index');
const UserDAO = {}


UserDao.findUserBySessionID = function









UserDAO.findUserByPhoneNumber = function(phoneNumber) {
    return new Promise((resolve, reject) => {
        User.findOne({phoneNumber})
            .then((user) => {
                if (!user) {
                    return resolve(false);
                }
                else {
                    return resolve(user);
                }
            }).catch((err) => reject(err));
    });
};




UserDAO.findAllUsers = function() {
    return new Promise((resolve, reject) => {
        User.find()
            .then((users) => {
                return resolve(users);
            }).catch((err) => reject(err));
    });
};


UserDAO.createUser = function(sessionId) {
    return new Promise ((resolve, reject) => {
        const newUser = new User ();
        newUser.save()
            .then((user) => {
                return user
            }).catch((err) => reject(err))
            .then((milkshake) => {

            })
    });-
};




module.exports = UserDAO;




