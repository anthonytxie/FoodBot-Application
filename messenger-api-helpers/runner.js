const userDAO = require('./../db/dao/userDAO');

const initialize = (senderId) => {
  return new Promise((resolve, reject) => {
    userDAO.createUser(senderId)
      .then((user) => {
         resolve(`created new order for ${user._id}`);
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