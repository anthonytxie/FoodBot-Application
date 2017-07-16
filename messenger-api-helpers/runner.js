const userDAO = require('./../db/DAO/userDAO');
const sessionDAO = require('./../db/DAO/sessionDAO')
const orderDAO = require('./../db/DAO/orderDAO');
const burgerDAO = require('./../db/DAO/burgerDAO')


const initialize = (senderId) => {
  return userDAO.createUser(senderId)
};

const createNewOrder = (senderId) => {
  return sessionDAO.sessionRenewal(senderId)
    .then((session) => {
      return orderDAO.initializeOrder(senderId, session._id)
    }).catch((err) => console.log(err))
};


const addBurgertoOrder = (senderId) => {
  return sessionDAO.sessionRenewal(senderId)
    .then((session) => {
      return burgerDAO.post({patties:1}, session._id)
    }).catch((err) => console.log(err))
};


module.exports = { initialize, createNewOrder, addBurgertoOrder };