const userDAO = require('./../db/DAO/userDAO');
const sessionDAO = require('./../db/DAO/sessionDAO')
const initialize = (senderId) => {
  return userDAO.createUser(senderId)
};

const createNewOrder = (senderId) => {
  return sessionDAO.sessionRenewal(senderId)
};


const order = () => {
  return new Promise((resolve, reject) => {
    resolve('added to order')
  });
};


module.exports = { initialize, createNewOrder, order };