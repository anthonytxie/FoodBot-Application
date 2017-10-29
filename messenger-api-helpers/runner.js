//refactor to requiring all from indexDAO
const userDAO = require("./../db/DAO/userDAO");
const sessionDAO = require("./../db/DAO/sessionDAO");
const orderDAO = require("./../db/DAO/orderDAO");
const itemDAO = require("./../db/DAO/itemDAO");
const linkDAO = require("./../db/DAO/linkDAO");
// ===== USERS ===============================================================

const initialize = senderId => {
  return userDAO
    .isUserCreated(senderId)
    .then(isCreated => {
      if (isCreated) {
        return sessionDAO.renewSession(senderId).then(session => {
          return orderDAO.initializeOrder(senderId, session._id);
        });
      } else {
        return userDAO.createUser(senderId).then(user => {
          return orderDAO.initializeOrder(senderId, user._sessions[0]);
        });
      }
    })
    .catch(err => console.log(err));
};

// ===== SESSION ===============================================================

const renewSession = senderId => {
  return sessionDAO.renewSession(senderId);
};

const renewSessionAndReturnOrder = senderId => {
  return sessionDAO.renewSession(senderId).then(session => {
    return orderDAO.getOrderBySessionId(session._id);
  });
};

const isSessionActive = senderId => {
  return sessionDAO.isSessionActive(senderId);
};

// ===== ORDERS ===============================================================

const createNewOrder = senderId => {
  return sessionDAO
    .renewSession(senderId)
    .then(session => {
      return orderDAO.initializeOrder(senderId, session._id);
    })
    .catch(err => console.log(err));
};

// ===== Items ===============================================================

const addBurgerToOrder = (senderId, data) => {
  return sessionDAO
    .renewSession(senderId)
    .then(session => {
      return itemDAO.postBurger(data, senderId);
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

// ===== LINK ===============================================================

const createNewLinkAndReturnLinkAndOrderIds = (senderId) => {
  let linkId;
  let orderId;
  return sessionDAO
    .renewSession(senderId)
    .then(session => {
      return orderDAO.getOrderBySessionId(session._id);
    })
    .then((order) => {
      orderId = order._id;
      return linkDAO.createNewLink();
    })
    .then(link => {
      linkId = link._id;
    })
    .then(() => {
      return {linkId, orderId}
    })
    .catch(err => console.log(err));
};

module.exports = {
  initialize,
  createNewOrder,
  addBurgerToOrder,
  addSideToOrder,
  addDrinkToOrder,
  renewSession,
  isSessionActive,
  renewSessionAndReturnOrder,
  createNewLinkAndReturnLinkAndOrderIds
};
