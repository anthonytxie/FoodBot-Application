const messages = require('././messages/index');
const castArray = require('lodash/castArray');
const sendApi = require('./sendApi');


// SIMPLE SENDER FUNCTIONS

const sendInitializeMessage = (recipientId, data) => {
  sendMessage(recipientId, messages.welcomeMessage);
};


const sendMessageGeneric = (recipientId, message) => {
  sendMessage(recipientId, messages.messageTemplate(message));
};


// ===== MENU ===============================================================
const sendMenuMessage = (recipientId) => {
  sendMessage(recipientId, messages.menuMessage);
};

const sendSpecialBurgerMenu = (recipientId, data) => {
  sendMessage(recipientId, messages.specialBurgerMenuMessageOne);
  setTimeout(() => {
    sendMessage(recipientId, messages.specialBurgerMenuMessageTwo);
  }, 400);
};

const sendNormalBurgerMenu = (recipientId, data) => {
  sendMessage(recipientId, messages.normalBurgerMenuMessageOne);
};

const sendSideMenu = (recipientId, data) => {
  sendMessage(recipientId, messages.sideMenuMessage);
};


// ===== ORDER ===============================================================
const sendOrderedMessage = (recipientId, order) => {
  sendMessage(recipientId, messages.orderAskContinue(order))
};

const sendOrderedBurgerUpsizeMessage = (recipientId, order) => {
  sendMessage(recipientId, messages.upsizeOrderMessage(recipientId, order));
};

const sendConfirmPaidMessage = (recipientId, order) => {
  sendMessage(recipientId, messages.messageTemplate("Awesome. The payment has been processed and we sent your order to the restaurant. We'll see you soon!"));
};

const sendConfirmUnpaidMessage = (recipientId, order) => {
  sendMessage(recipientId, messages.messageTemplate("Awesome. We sent your order to the restaurant. We'll see you soon!"));
};

// ===== ITEMS ===============================================================
const sendBurgerOrderPrompt = (recipientId, data, order) => {
  sendMessage(recipientId, messages.burgerTemplate(data, order, recipientId));
};

const askFriesSize = (recipientId, order) => {
  sendMessage(recipientId, messages.askFriesSizeMessage(order));
};

const askMilkshakeFlavor = (recipientId, order) => {
  sendMessage(recipientId, messages.askMilkshakeFlavorMessage(order));
};

const sendComboError = (recipientId, order) => {
  sendMessage(recipientId, messages.comboErrorMessage);
};


// ===== ECHO & GENERIC ===============================================================

const sendEchoMessage = (recipientId, message) => {
  sendMessage(recipientId, messages.messageTemplate(message));
};



// MAIN SENDER MESSAGE FUNCTION

// Send one or more messages using the Send API.
const sendMessage = (recipientId, messagePayloads) => {
  // in case there are multiple message Payloads it casts as an array
  // then iterates over each to convert into JSON format for sender API.
  const messagePayloadArray = castArray(messagePayloads)
    .map((messagePayload) => messageToJSON(recipientId, messagePayload));

  console.log(messagePayloadArray)
  sendApi.callMessagesAPI([
    typingOn(recipientId),
    ...messagePayloadArray,
    typingOff(recipientId),
  ]);

};



// SENDER HELPER FUNCTIONS

// Wraps a message JSON object with recipient information.
const messageToJSON = (recipientId, messagePayload) => {
  return {
    recipient: {
      id: recipientId,
    },
    message: messagePayload,
  };
};

const typingOn = (recipientId) => {
  return {
    recipient: {
      id: recipientId,
    },
    sender_action: 'typing_on', // eslint-disable-line camelcase
  };
};


// Turns typing indicator off.
const typingOff = (recipientId) => {
  return {
    recipient: {
      id: recipientId,
    },
    sender_action: 'typing_off', // eslint-disable-line camelcase
  };
};


// Send a read receipt to indicate the message has been read
const sendReadReceipt = (recipientId) => {
  const messageData = {
    recipient: {
      id: recipientId,
    },
    sender_action: 'mark_seen', // eslint-disable-line camelcase
  };

  sendApi.callMessagesAPI(messageData);
};




module.exports = {
  sendMessage,
  sendMenuMessage,
  sendReadReceipt,
  sendInitializeMessage,
  sendEchoMessage,
  sendSpecialBurgerMenu,
  sendNormalBurgerMenu,
  sendSideMenu,
  sendBurgerOrderPrompt,
  sendOrderedBurgerUpsizeMessage,
  sendOrderedMessage,
  sendConfirmUnpaidMessage,
  sendConfirmPaidMessage,
  sendMessageGeneric,
  askFriesSize,
  askMilkshakeFlavor,
  sendComboError
};


