const {Burger, Fry, Drink, Milkshake, Order, Session, User } = require('./../index');
const userDAO = {};


userDAO.createUser = function(firstName, lastName) {
    return new Promise ((resolve, reject) => {
        const newUser = new User ({firstName, lastName});
        newUser.save()
            .then((user) => {
                return user
            }).catch((err) => reject(err))
    });
};


module.exports = userDAO;