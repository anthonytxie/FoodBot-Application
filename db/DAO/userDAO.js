const {Burger, Fry, Drink, Milkshake, Order, User } = require('./../index');
const UserDAO = {}


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


UserDAO.createUser = function(phoneNumber) {
    return new Promise ((resolve, reject) => {
        const newUser = new User ({phoneNumber});
        newUser.save()
            .then((user) => resolve(user)).catch((err) => reject(err));
    });
};


module.exports = UserDAO;




