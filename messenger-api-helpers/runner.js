const userDAO = require('./../db/DAO/userDAO');
const sessionDAO = require('./../db/DAO/sessionDAO')
const orderDAO = require('./../db/DAO/orderDAO');

const initialize = (senderId) => {
  return UserDAO.createUser(senderId)
};

const createNewOrder = (senderId) => {
  return sessionDAO.sessionRenewal(senderId)
    .then((session) => {
      return orderDAO.initializeOrder(senderId, session._id)
    }).catch((err) => console.log(err))
};



const order = () => {
  return new Promise((resolve, reject) => {
    resolve('added to order')
  });
};


module.exports = { initialize, createNewOrder, order };