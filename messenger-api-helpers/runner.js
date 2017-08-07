//refactor to requiring all from indexDAO
const userDAO = require("./../db/DAO/userDAO");
const sessionDAO = require("./../db/DAO/sessionDAO");
const orderDAO = require("./../db/DAO/orderDAO");
const itemDAO = require('./../db/DAO/itemDAO');

// ===== USERS ===============================================================

const initialize = (senderId) => {
  return userDAO.isUserCreated(senderId)
    .then((isCreated) => {
      if (isCreated) {
        return sessionDAO.renewSession(senderId)
          .then((session) => {
            return orderDAO.initializeOrder(senderId, session._id)
          })
      }
      else {
        return userDAO.createUser(senderId)
          .then((user) => {
            return orderDAO.initializeOrder(senderId, user._sessions[0])
          })
      }
    }).catch((err) => console.log(err));
};

const isUserCreated = (senderId) => {
  return userDAO.isUserCreated(senderId)
}

// ===== SESSION ===============================================================

const renewSession = (senderId) => {
  return sessionDAO.renewSession(senderId)
};

const renewSessionAndReturnOrder = (senderId) => {
  return sessionDAO.renewSession(senderId)
    .then((session) => {
      return orderDAO.showOrderDetails(session._id)
    })
};


const isSessionActive = (senderId) => {
  return sessionDAO.isSessionActive(senderId)
};

// ===== ORDERS ===============================================================

const createNewOrder = (senderId) => {
  return sessionDAO
    .renewSession(senderId)
    .then(session => {
      return orderDAO.initializeOrder(senderId, session._id);
    })
    .catch(err => console.log(err));
};


const showCurrentOrder = (senderId) => {
  return sessionDAO
    .renewSession(senderId)
    .then(session => {
      return orderDAO.showOrderDetails(session._id);
    })
    .catch(err => console.log(err));
};

// ===== Items ===============================================================


const addBurgerToOrder = (senderId, data) => {
  return sessionDAO
    .renewSession(senderId)
    .then(session => {
      return itemDAO.postBurger(data.foodObject, data.orderId);
    })
    .catch(err => console.log(err));
};


const addSideToOrder = (senderId, data) => {
  return sessionDAO
    .renewSession(senderId)
    .then(session => {
      return itemDAO.postSide(data.foodObject, data.orderId);
    })
    .catch(err => console.log(err));
};

const addDrinkToOrder = (senderId, data) => {
  return sessionDAO
    .renewSession(senderId)
    .then(session => {
      return itemDAO.postDrink(data.foodObject, data.orderId);
    })
    .catch(err => console.log(err));
};

const deleteMostRecentItemAdded = (senderId) => {
  return sessionDAO
    .renewSession(senderId)
    .then(session => {
      return itemDAO.deleteMostRecentItem(session._id);
    })
    .catch(err => console.log(err));
};


module.exports = {
  initialize,
  createNewOrder,
  addBurgerToOrder,
  addSideToOrder,
  addDrinkToOrder,
  deleteMostRecentItemAdded,
  showCurrentOrder,
  renewSession,
  isSessionActive,
  isUserCreated,
  renewSessionAndReturnOrder
};

// my idea right now is to always send API.AI a message or context on every postback.
// on every message send the entire query.
//Messages are easy, postbacks are a bit harder.
// idea whenever someone sends an order back we send a button with postback with the ID of the item in the payload