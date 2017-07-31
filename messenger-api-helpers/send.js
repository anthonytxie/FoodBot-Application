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

const sendMenuMessage = (recipientId, data) => {
  sendMessage(recipientId, messages.menuMessage);
};

const sendSpecialBurgerMenu = (recipientId, data) => {
  sendMessage(recipientId, messages.specialBurgerMenuMessageOne);
  sendMessage(recipientId, messages.specialBurgerMenuMessageTwo);

};

const sendNormalBurgerMenu = (recipientId, data) => {
  sendMessage(recipientId, messages.normalBurgerMenuMessageOne);
  sendMessage(recipientId, messages.normalBurgerMenuMessageTwo);

};

const sendDrinkMenuMessage = (recipientId, data) => {
  sendMessage(recipientId, messages.drinkMenuMessage);
};


const sendFriesMenuMessage = (recipientId, data) => {
  sendMessage(recipientId, messages.FriesMenuMessage);
};


// ===== ORDER ===============================================================
const sendOrderedMessage = (recipientId, order) => {
  sendMessage(recipientId, messages.orderAskContinue(order))
}

const sendBurgerOrderPrompt = (recipientId, data, order) => {
  sendMessage(recipientId, messages.burgerTemplate(data, order));
}

const sendOrderedBurgerUpsizeMessage = (recipientId, data,order) => {
  sendMessage(recipientId, messages.upsizeOrderMessage(order));
}

const sendCreateNewOrderMessage = (recipientId, data) => {
  sendMessage(recipientId, messages.messageTemplate(data));
};

const sendOrderMessage = (recipientId) => {
  sendMessage(recipientId, messages.messageTemplate());
};


const sendConfirmOrderMessage = (recipientId) => {
  sendMessage(recipientId, messages.confirmedMessageTemplate());
};

// ===== RECEIPT ===============================================================

const sendReceiptTemplate = (recipientId, order) => {
  sendMessage(recipientId, messages.receiptTemplate(order));
}

// ===== ECHO & GENERIC ===============================================================

const sendGenericTemplate = (recipientId) => {
  sendMessage(recipientId, messages.genericTemplate)
}


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
  sendCreateNewOrderMessage,
  sendOrderMessage,
  sendEchoMessage,
  sendGenericTemplate,
  sendSpecialBurgerMenu,
  sendNormalBurgerMenu,
  sendDrinkMenuMessage,
  sendFriesMenuMessage,
  sendBurgerOrderPrompt,
  sendOrderedBurgerUpsizeMessage,
  sendOrderedMessage,
  sendFarewellMessage,
  sendReceiptTemplate
};


