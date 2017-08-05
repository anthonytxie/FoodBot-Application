const messages = require('././messages/index');
const castArray = require('lodash/castArray');
const sendApi = require('./sendApi');


// SIMPLE SENDER FUNCTIONS

const sendInitializeMessage = (recipientId, data) => {
  sendMessage(recipientId, messages.welcomeMessage);
};


const sendFarewellMessage = (recipientId) => {
  sendMessage(recipientId, messages.messageTemplate('Farewell!'));
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
  setTimeout(() => {
    sendMessage(recipientId, messages.normalBurgerMenuMessageTwo);
  }, 400);
  setTimeout(() => {
    sendMessage(recipientId, messages.normalBurgerMenuMessageThree);
  }, 800);
};

const sendSideMenu = (recipientId, data) => {
  sendMessage(recipientId, messages.sideMenuMessage);
};


// ===== ORDER ===============================================================
const sendOrderedMessage = (recipientId, order) => {
  sendMessage(recipientId, messages.orderAskContinue(order))
};

const sendBurgerOrderPrompt = (recipientId, data, order) => {
  sendMessage(recipientId, messages.burgerTemplate(data, order, recipientId));
};

const sendSideOrderPrompt = (recipientId, data) => {
  sendMessage(recipientId, messages.sideTemplate(data));
};

const sendOrderedBurgerUpsizeMessage = (recipientId, data, order) => {
  sendMessage(recipientId, messages.upsizeOrderMessage(order, recipientId));
};


// ===== RECEIPT ===============================================================
const sendReceiptTemplate = (recipientId, order) => {
  sendMessage(recipientId, messages.messageTemplate('OK this is your order'))
  setTimeout(() => {
    sendMessage(recipientId, messages.receiptMessageTemplate(order));
  }, 500);
};

// ===== ECHO & GENERIC ===============================================================
const sendGenericTemplate = (recipientId) => {
  sendMessage(recipientId, messages.genericTemplate)
};

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
  sendGenericTemplate,
  sendSpecialBurgerMenu,
  sendNormalBurgerMenu,
  sendSideMenu,
  sendBurgerOrderPrompt,
  sendSideOrderPrompt,
  sendOrderedBurgerUpsizeMessage,
  sendOrderedMessage,
  sendFarewellMessage,
  sendReceiptTemplate
};


