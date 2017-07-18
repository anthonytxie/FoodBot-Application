//refactor to requiring all from indexDAO
const userDAO = require("./../db/DAO/userDAO");
const sessionDAO = require("./../db/DAO/sessionDAO");
const orderDAO = require("./../db/DAO/orderDAO");
const burgerDAO = require("./../db/DAO/burgerDAO");
const milkshakeDAO = require("./../db/DAO/milkshakeDAO");
const fryDAO = require("./../db/DAO/fryDAO");

// ===== USERS ===============================================================
const initialize = (senderId) => {
  return userDAO.createUser(senderId);
};

// ===== ORDERS ===============================================================

const createNewOrder = (senderId) => {
  return sessionDAO
    .sessionRenewal(senderId)
    .then(session => {
      return orderDAO.initializeOrder(senderId, session._id);
    })
    .catch(err => console.log(err));
};

const deleteMostRecentItemAdded = (senderId) => {
  return sessionDAO
    .sessionRenewal(senderId)
    .then(session => {
      return orderDAO.deleteMostRecentItem(session._id);
    })
    .catch(err => console.log(err));
};

const confirmOrder = (senderId) => {
  return sessionDAO
    .sessionRenewal(senderId)
    .then(session => {
      return orderDAO.confirmOrder(session._id, true);
    })
    .catch(err => console.log(err));
};

const unconfirmOrder = (senderId) => {
  return sessionDAO
    .sessionRenewal(senderId)
    .then(session => {
      return orderDAO.confirmOrder(session._id, false);
    })
    .catch(err => console.log(err));
};

const showCurrentOrder = (senderId) => {
  return sessionDAO
    .sessionRenewal(senderId)
    .then(session => {
      return orderDAO.showOrderDetails(session._id);
    })
    .catch(err => console.log(err));
};

// ===== Items ===============================================================

const addBurgertoOrder = (senderId) => {
  return sessionDAO
    .sessionRenewal(senderId)
    .then(session => {
      return burgerDAO.post({ patties: 1 }, session._id);
    })
    .catch(err => console.log(err));
};

const addDrinktoOrder = (senderId) => {
  return sessionDAO
    .sessionRenewal(senderId)
    .then(session => {
      return drinkDAO.post({ size: "medium" }, session._id);
    })
    .catch(err => console.log(err));
};

const addFriestoOrder = (senderId) => {
  return sessionDAO
    .sessionRenewal(senderId)
    .then(session => {
      return friesDAO.post({ size: "medium" }, session._id);
    })
    .catch(err => console.log(err));
};

const addMilkshaketoOrder = (senderId) => {
  return sessionDAO
    .sessionRenewal(senderId)
    .then(session => {
      return milkshakeDAO.post({ size: "medium" }, session._id);
    })
    .catch(err => console.log(err));
};

module.exports = {
  initialize,
  createNewOrder,
  addBurgertoOrder,
  addDrinktoOrder,
  addFriestoOrder,
  addMilkshaketoOrder
};

// my idea right now is to always send API.AI a message or context on every postback.
// on every message send the entire query.
//Messages are easy, postbacks are a bit harder.
// idea whenever someone sends an order back we send a button with postback with the ID of the item in the payload