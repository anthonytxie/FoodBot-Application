const userDAO = require('./../db/DAO/userDAO');

const initialize = (senderId) => {
  return userDAO.createUser(senderId)

  // create the user
  //set new session on the user
  
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