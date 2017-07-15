const {Burger, Fry, Drink, Milkshake, Order, Session, User } = require('./../index');
const userDAO = {};


userDAO.createUser = function(PSID) {
    return new Promise ((resolve, reject) => {
        const newUser = new User ({PSID});
        newUser.save()
            .then((user) => {
                resolve(user)
            }).catch((err) => reject(err))
    });
};


module.exports = userDAO;