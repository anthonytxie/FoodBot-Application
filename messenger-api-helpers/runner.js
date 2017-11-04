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
    .then(() => {
      return itemDAO.postBurger(data, senderId);
    })
    .catch(err => console.log(err));
};

const addSideToOrder = (senderId, foodObject) => {
  return sessionDAO
    .renewSession(senderId)
    .then(() => {
      return itemDAO.postSide(foodObject, senderId);
    })
    .catch(err => console.log(err));
};

const addDrinkToOrder = (senderId, foodObject) => {
  return sessionDAO
    .renewSession(senderId)
    .then(() => {
      return itemDAO.postDrink(foodObject, senderId);
    })
    .catch(err => console.log(err));
};

const removeComboItems = (senderId, linkId) => {
  return sessionDAO
    .renewSession(senderId)
    .then(() => {
      return itemDAO.removeComboItems(senderId, linkId);
    })
    .catch(err => console.log(err));
};

// ===== LINK ===============================================================

const createNewLink = senderId => {
  return sessionDAO
    .renewSession(senderId)
    .then(() => {
      return linkDAO.createNewLink();
    })
    .then(linkId => {
      return linkId;
    })
    .catch(err => console.log(err));
};

module.exports = {
  initialize,
  createNewOrder,
  addBurgerToOrder,
  addSideToOrder,
  addDrinkToOrder,
  removeComboItems,
  renewSession,
  isSessionActive,
  renewSessionAndReturnOrder,
  createNewLink
};
