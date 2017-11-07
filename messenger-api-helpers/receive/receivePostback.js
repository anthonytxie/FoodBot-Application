const send = require("./../send");
const runner = require("./../runner");
const { isStoreOpen } = require("./../utility/helperFunctions");
const { logger } = require("./../../server/logger/logger");
const handleReceivePostback = messagingEvent => {
  //assuming payload is an object that has type and data
  const { type, data } = JSON.parse(messagingEvent.postback.payload);
  //On Tue May 17 format of user and page ids delivered via webhooks will change from an int to a string
  const senderId = messagingEvent.sender.id.toString();
  // runner does stuff with API.ai and webhook

  logger.info(`${senderId} received postback`);

  if (!isStoreOpen()) {
    runner.isSessionActive(senderId).then(isSessionActive => {
      if (isSessionActive) {
        switch (type) {
          case "initialize":
            logger.info(`${senderId} initialize`);
            runner.initialize(senderId).then(() => {
              send.sendInitializeMessage(senderId);
            });
            break;
          case "see-menu":
            logger.info(`${senderId} see-menu command`);
            runner.renewSession(senderId).then(order => {
              send.sendMenuMessage(senderId);
            });
            break;
          case "create-new-order":
            logger.info(`${senderId} create-new-order command`);
            runner.createNewOrder(senderId).then(order => {
              send.sendMenuMessage(senderId);
            });
            break;
          case "show-burger":
            logger.info(
              `${senderId} show-burger command ${data.itemName}`
            );
            runner
              .createNewLink(senderId)
              .then(link => {
                send.sendBurgerOrderPrompt(senderId, data, link._id);
              })
              .catch(err => console.log(err));
            break;
          case "order-side":
            logger.info(
              `${senderId} order-side command ${data.foodObject.itemName}`
            );
            if (
              data.foodObject.itemName === "Cheesy Fries" ||
              data.foodObject.itemName === "Poutine"
            ) {
              runner
                .renewSessionAndReturnOrder(senderId)
                .then(order => {
                  return runner.addSideToOrder(senderId, {
                    itemName: data.foodObject.itemName
                  });
                })
                .then(() => {
                  send.sendOrderedMessage(senderId);
                });
            } else if (data.foodObject.itemName === "Fries") {
              runner.renewSessionAndReturnOrder(senderId).then(() => {
                send.askFriesSize(senderId);
              });
            } else if (data.foodObject.itemName === "milkshake") {
              runner.renewSessionAndReturnOrder(senderId).then(() => {
                send.askMilkshakeFlavor(senderId);
              });
            }

            break;
          case "order-burger":
            logger.info(
              `${senderId} order-burger command ${data.itemName}`
            );
            runner
              .addBurgerToOrder(senderId, data)
              .then(burger => {
                send.sendOrderedBurgerUpsizeMessage(senderId, burger._link);
              })
              .catch(err => console.log(err));
            break;
          case "order-no-combo":
            logger.info(`${senderId} order-no-combo`);
            runner
              .removeComboItems(senderId, data.linkId)
              .then(() => {
                send.sendOrderedMessage(senderId);
              })
              .catch(err => console.log(err));
            break;
          case "edit-order":
            logger.info(`${senderId} edit-order`);
            runner
              .renewSessionAndReturnOrder(senderId)
              .then(order => {
                send.sendEditOrderMessage(senderId);
              })
              .catch(err => console.log(err));
            break;

          default:
            logger.info(`${senderId} don't know what command was called`);
            break;
        }
      } else {
        logger.info(`${senderId} initialize new session`);
        runner.initialize(senderId).then(() => {
          send.sendInitializeMessage(senderId);
        });
      }
    });
  } else {
    logger.info(`${senderId} store is closed`);
    send.sendMessageGeneric(
      senderId,
      "Sorry we are closed! Our hours for delivery are between 11 AM and 11 PM Monday to Sunday. Check back tomorrow for some fresh burgers :)"
    );
  }
};

module.exports = { handleReceivePostback };
