//refactor to requiring all from indexDAO
const userDAO = require("./../db/DAO/userDAO");
const sessionDAO = require("./../db/DAO/sessionDAO");
const orderDAO = require("./../db/DAO/orderDAO");
const itemDAO = require('./../db/DAO/itemDAO');

// ===== USERS ===============================================================
const initialize = (senderId) => {
  return userDAO.createUser(senderId);
};

// ===== MENU ===============================================================
const showMenu = (senderId) => {
  return sessionDAO.sessionRenewal(senderId)
};

const showSpecialBurgerMenu = (senderId) => {
  return sessionDAO.sessionRenewal(senderId)
};

const showNormalBurgerMenu = (senderId) => {
  return sessionDAO.sessionRenewal(senderId)
};

const showDrinkMenu = (senderId) => {
  return sessionDAO.sessionRenewal(senderId)
};

const showFriesMenu = (senderId) => {
  return sessionDAO.sessionRenewal(senderId)
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


const addItemtoOrder = (senderId, payload) => {
  return sessionDAO
    .sessionRenewal(senderId)
    .then(session => {
      return itemDAO.post(payload, session._id);
    })
    .catch(err => console.log(err));
};

const deleteMostRecentItemAdded = (senderId) => {
  return sessionDAO
    .sessionRenewal(senderId)
    .then(session => {
      return itemDAO.deleteMostRecentItem(session._id);
    })
    .catch(err => console.log(err));
};

module.exports = {
  initialize,
  createNewOrder,
  confirmOrder,
  unconfirmOrder,
  addItemtoOrder,
  deleteMostRecentItemAdded,
  showCurrentOrder,
  showMenu,
  showSpecialBurgerMenu,
  showNormalBurgerMenu,
  showDrinkMenu,
  showFriesMenu
};

// my idea right now is to always send API.AI a message or context on every postback.
// on every message send the entire query.
//Messages are easy, postbacks are a bit harder.
// idea whenever someone sends an order back we send a button with postback with the ID of the item in the payload