const messages = require("././messages/index");
const castArray = require("lodash/castArray");
const sendApi = require("./sendApi");
const { logger } = require("./../server/logger/logger");
// SIMPLE SENDER FUNCTIONS

const sendInitializeMessage = (recipientId, data) => {
    sendMessage(recipientId, messages.welcomeMessage(data));
};

const sendMessageGeneric = (recipientId, message) => {
    sendMessage(recipientId, messages.messageTemplate(message));
};

// ===== MENU ===============================================================
const sendMenuMessage = recipientId => {
    sendMessage(recipientId, messages.menuMessage);
};

const sendSpecialBurgerMenu = (recipientId, data) => {
    sendMessage(recipientId, messages.specialBurgerMenuMessageOne);
    setTimeout(() => {
        sendMessage(recipientId, messages.specialBurgerMenuMessageTwo);
    }, 400);
};

const sendNormalBurgerMenu = (recipientId, data) => {
    sendMessage(recipientId, messages.normalBurgerMenuMessage);
};

const sendSideMenu = (recipientId, data) => {
    sendMessage(recipientId, messages.sideMenuMessage);
};

// ===== ORDER ===============================================================
const sendOrderedMessage = recipientId => {
    sendMessage(recipientId, messages.orderAskContinue(recipientId));
};

const sendOrderedBurgerUpsizeMessage = (recipientId, linkId) => {
    sendMessage(recipientId, messages.upsizeOrderMessage(recipientId, linkId));
};

const sendConfirmPaidMessageDelivery = (recipientId, data) => {
    sendMessage(
        recipientId,
        messages.messageTemplate(
            `Awesome! the payment has been processed! We'll have the order delivered at ${data.address} at in 30-45 minutes. Your confirmation code is ${data.confirmationNumber}.`
        )
    );

    sendMessage(recipientId, messages.nextOrderMessage());
};

const sendConfirmPaidMessagePickup = (recipientId, data) => {
    sendMessage(
        recipientId,
        messages.messageTemplate(
            `Awesome! Your payment has been processed! We'll have the order ready for you to pick-up in around 30-45 minutes. Your confirmation code is ${data.confirmationNumber}.`
        )
    );
    setTimeout(() => {
        sendMessage(recipientId, messages.nextOrderMessage());
    }, 1000);
    sendMessage(recipientId, messages.callRestaurantMessage());
};

const sendConfirmUnpaidMessagePickup = (recipientId, data) => {
    sendMessage(
        recipientId,
        messages.messageTemplate(
            `Awesome. We sent your order to the restaurant. It should be ready in around 30-45 minutes. Tell the cashier your order Id is ${data.confirmationNumber}`
        )
    );
    sendMessage(recipientId, messages.nextOrderMessage());
};

const sendConfirmUnpaidMessageDelivery = (recipientId, data) => {
    sendMessage(
        recipientId,
        messages.messageTemplate(
            `Awesome. We have your order delivered to ${data.address}. It should be ready in around 30-45 minutes. Your confirmation code is ${data.confirmationNumber}.`
        )
    );
    sendMessage(recipientId, messages.nextOrderMessage());
};

const sendEditOrderMessage = recipientId => {
    sendMessage(recipientId, messages.editOrder(recipientId));
};

const sendEmptyOrderMessage = (recipientId, order) => {
    sendMessage(recipientId, messages.emptyOrderMessage());
};

const sendNextOrderMessage = recipientId => {
    sendMessage(recipientId, messages.nextOrderMessage());
};

const sendNewOrderMessage = recipientId => {
    sendMessage(recipientId, messages.newOrderMessage());
};

// ===== ITEMS ===============================================================
const sendBurgerOrderPrompt = (recipientId, data, linkId) => {
    sendMessage(
        recipientId,
        messages.burgerTemplate(data, linkId, recipientId)
    );
};

const askFriesSize = recipientId => {
    sendMessage(recipientId, messages.askFriesSizeMessage());
};

const askMilkshakeFlavor = recipientId => {
    sendMessage(recipientId, messages.askMilkshakeFlavorMessage());
};

const sendComboError = (recipientId, order) => {
    sendMessage(recipientId, messages.comboErrorMessage);
};

// ===== RESTAURANT ===============================================================
const sendRestaurantNumber = recipientId => {
    sendMessage(recipientId, messages.callRestaurantMessage());
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
    const messagePayloadArray = castArray(messagePayloads).map(messagePayload =>
        messageToJSON(recipientId, messagePayload)
    );

    logger.verbose(`${recipientId} ${messagePayloadArray}`);
    sendApi.callMessagesAPI([
        typingOn(recipientId),
        ...messagePayloadArray,
        typingOff(recipientId)
    ]);
};

// SENDER HELPER FUNCTIONS

// Wraps a message JSON object with recipient information.
const messageToJSON = (recipientId, messagePayload) => {
    return {
        recipient: {
            id: recipientId
        },
        message: messagePayload
    };
};

const typingOn = recipientId => {
    return {
        recipient: {
            id: recipientId
        },
        sender_action: "typing_on" // eslint-disable-line camelcase
    };
};

// Turns typing indicator off.
const typingOff = recipientId => {
    return {
        recipient: {
            id: recipientId
        },
        sender_action: "typing_off" // eslint-disable-line camelcase
    };
};

// Send a read receipt to indicate the message has been read
const sendReadReceipt = recipientId => {
    const messageData = {
        recipient: {
            id: recipientId
        },
        sender_action: "mark_seen" // eslint-disable-line camelcase
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
    sendConfirmUnpaidMessagePickup,
    sendConfirmUnpaidMessageDelivery,
    sendConfirmPaidMessagePickup,
    sendConfirmPaidMessageDelivery,
    sendEditOrderMessage,
    sendEmptyOrderMessage,
    sendNextOrderMessage,
    sendNewOrderMessage,
    sendMessageGeneric,
    askFriesSize,
    askMilkshakeFlavor,
    sendComboError,
    sendRestaurantNumber
};
