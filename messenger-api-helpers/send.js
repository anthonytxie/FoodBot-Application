const messages = require('././messages/index');
const castArray = require('lodash/castArray');
const sendApi = require('./sendApi');


// DIFFERENT SENDER FUNCTIONS

const sendInitializeMessage = (recipientId, runnerDelivery) => {
  sendMessage(recipientId, messages.welcomeMessage);
};


// ===== MENU ===============================================================

const sendMenuMessage = (recipientId, runnerDelivery) => {
  sendMessage(recipientId, messages.menuMessage);
};

const sendBurgerMenuMessage = (recipientId, runnerDelivery) => {
  sendMessage(recipientId, messages.burgerMenuMessage);
};

const sendDrinkMenuMessage = (recipientId, runnerDelivery) => {
  sendMessage(recipientId, messages.drinkMenuMessage);
};


const sendFriesMenuMessage = (recipientId, runnerDelivery) => {
  sendMessage(recipientId, messages.FriesMenuMessage);
};



const sendCreateNewOrderMessage = (recipientId, runnerDelivery) => {
  sendMessage(recipientId, messages.messageTemplate(runnerDelivery));
};

const sendOrderMessage = (recipientId, runnerDelivery) => {
  sendMessage(recipientId, messages.messageTemplate(runnerDelivery));
};














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
  sendBurgerMenuMessage,
  sendDrinkMenuMessage,
  sendFriesMenuMessage
};




