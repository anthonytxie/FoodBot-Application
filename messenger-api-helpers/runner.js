const userDAO = require('./../db/DAO/userDAO');

const initialize = (senderId) => {
  return new Promise((resolve, reject) => {
    userDAO.createUser(senderId)
      .then((user) => {
         console.log(user);
         resolve(`user has been initialized`);
      }).catch((err) => reject(err));
  });
};

const createNewOrder = () => {
  return new Promise((resolve, reject) => {
    resolve('created new order')
  });
};


const order = () => {
  return new Promise((resolve, reject) => {
    resolve('added to order')
  });
};


module.exports = { initialize, createNewOrder, order };