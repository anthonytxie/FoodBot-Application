//refactor to requiring all from indexDAO
const userDAO = require("./../db/DAO/userDAO");
const sessionDAO = require("./../db/DAO/sessionDAO");
const orderDAO = require("./../db/DAO/orderDAO");
const itemDAO = require("./../db/DAO/itemDAO");
const linkDAO = require("./../db/DAO/linkDAO");
const { logger } = require("./../server/logger/logger");

// ===== USERS ===============================================================

const initialize = senderId => {
  logger.info(`${senderId} runner initialize`);
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
    .catch(err => logger.error(`${senderId} error runner initialize`, {err}));
};

// ===== SESSION ===============================================================

const renewSession = senderId => {
  logger.info(`${senderId} runner renewSession`);
  return sessionDAO
    .renewSession(senderId)
    .then(session => {
      return session;
    })
    .catch(err => logger.error(`${senderId} error runner renewSession`, {err}));
};

const renewSessionAndReturnOrder = senderId => {
  logger.info(`${senderId} runnerrenewSessionAndReturnOrder`);
  return sessionDAO
    .renewSession(senderId)
    .then(session => {
      return orderDAO.getOrderBySessionId(session._id);
    })
    .catch(err => logger.error(`${senderId} error runner renewSessionAndReturnOrder`, {err}));
};

const isSessionActive = senderId => {
  logger.info(`${senderId} runner isSessionActive`);
  return sessionDAO
    .isSessionActive(senderId)
    .then(isActive => {
      return isActive;
    })
    .catch(err => logger.error(`${senderId} error runner isSessionActive`, {err}));
};

// ===== ORDERS ===============================================================

const createNewOrder = senderId => {
  logger.info(`${senderId} runner createNewOrder`);
  return sessionDAO
    .renewSession(senderId)
    .then(session => {
      return orderDAO.initializeOrder(senderId, session._id);
    })
    .catch(err => logger.error(`${senderId} error runner createNewOrder`, {err}));
};

// ===== Items ===============================================================

const addBurgerToOrder = (senderId, data) => {
  logger.info(`${senderId} runner addBurgerToOrder ${JSON.stringify(data)}`);
  return sessionDAO
    .renewSession(senderId)
    .then(() => {
      return itemDAO.postBurger(data, senderId);
    })
    .catch(err => logger.error(`${senderId} error runner addBurgerToOrder`, {err}));
};

const addSideToOrder = (senderId, data) => {
  logger.info(`${senderId} runner addSideToOrder ${data}`);
  return sessionDAO
    .renewSession(senderId)
    .then(() => {
      return itemDAO.postSide(data, senderId);
    })
    .catch(err => logger.error(`${senderId} error runner addSideToOrder`, {err}));
};

const addDrinkToOrder = (senderId, data) => {
  logger.info(`${senderId} runner addDrinkToOrder ${data}`);
  return sessionDAO
    .renewSession(senderId)
    .then(() => {
      return itemDAO.postDrink(data, senderId);
    })
    .catch(err => logger.error(`${senderId} error runner addDrinkToOrder`, {err}));
};

const removeComboItems = (senderId, linkId) => {
  logger.info(`${senderId} runner removeComboItems ${linkId}`);
  return sessionDAO
    .renewSession(senderId)
    .then(() => {
      return itemDAO.removeComboItems(senderId, linkId);
    })
    .catch(err => logger.error(`${senderId} error runner removeComboItems`, {err}));
};

// ===== LINK ===============================================================

const createNewLink = senderId => {
  logger.info(`${senderId} runner createNewLink `);
  return sessionDAO
    .renewSession(senderId)
    .then(() => {
      return linkDAO.createNewLink();
    })
    .then(linkId => {
      return linkId;
    })
    .catch(err => logger.error(`${senderId} error runner createNewLink`, {err}));
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
