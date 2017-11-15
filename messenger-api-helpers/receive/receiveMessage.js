const { logger } = require("./../../server/logger/logger");
const send = require("./../send");
const runner = require("./../runner");
const handleReceiveMessage = messagingEvent => {
  const message = messagingEvent.message;
  //On Tue May 17 format of user and page ids delivered via webhooks will change from an int to a string
  //On Tue May 17 format of user and page ids delivered via webhooks will change from an int to a string
  const senderId = messagingEvent.sender.id.toString();
  // runner does stuff with API.ai and webhook
  // good practice to send a read receipt so if user is waiting for a response
  //they know the bot has seen the message

  send.sendReadReceipt(senderId);
  // this part needs to call API.AI with the message text
  // for now this will echo the text being received
  runner.isSessionActive(senderId).then(isSessionActive => {
    if (isSessionActive) {
      if (message.quick_reply) {
        const { type, data } = JSON.parse(
          messagingEvent.message.quick_reply.payload
        );
        //assuming payload is an object that has type and data
        switch (type) {
          case "see-special-burgers":
            logger.info(`${senderId} see-special-burgers`);
            runner
              .renewSession(senderId)
              .then(order => {
                send.sendSpecialBurgerMenu(senderId);
              })
              .catch(err =>
                logger.error(`see-special-burgers comand`, { err })
              );

            break;
          case "see-normal-burgers":
            logger.info(`${senderId} see-normal-burgers`);
            runner
              .renewSession(senderId)
              .then(order => {
                send.sendNormalBurgerMenu(senderId);
              })
              .catch(err =>
                logger.error(`see-normal-burgers command`, { err })
              );
              break;
          case "see-sides":
            logger.info(`${senderId} see-sides`);

            runner
              .renewSession(senderId)
              .then(order => {
                send.sendSideMenu(senderId);
              })
              .catch(err => logger.error(`see-sides command`, { err }));
              break;
          case "order-Fries":
            logger.info(`${senderId} order-Fries`);

            runner
              .addSideToOrder(senderId, data.foodObject)
              .then(() => {
                send.sendOrderedMessage(senderId);
              })
              .catch(err => logger.error(`order-Fries postBurger`, { err }));

            break;
          case "order-shake":
            logger.info(`${senderId} order-shake`);

            runner
              .addDrinkToOrder(senderId, data.foodObject)
              .then(() => {
                send.sendOrderedMessage(senderId);
              })
              .catch(err => logger.error(`order-shake command`, { err }));
            break;
          default:
            logger.info(`unknown postback called ${type}`);
            break;
        }
      } else {
        logger.info(`${senderId} send-dont-understand-message`);

        send.sendMessageGeneric(senderId, "Sorry I didn't understand that.");
      }
    } else {
      runner
        .initialize(senderId)
        .then(() => {
          send.sendInitializeMessage(senderId);
        })
        .catch(err => logger.error(`initialize not get started `, { err }));
    }
  });
};

module.exports = {
  handleReceiveMessage
};
