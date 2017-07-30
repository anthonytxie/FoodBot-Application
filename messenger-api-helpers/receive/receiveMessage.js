const send = require("./../send");
const runner = require("./../runner");

const handleReceiveMessage = messagingEvent => {
  const message = messagingEvent.message;
  //On Tue May 17 format of user and page ids delivered via webhooks will change from an int to a string
  const senderId = messagingEvent.sender.id.toString();

  // good practice to send a read receipt so if user is waiting for a response
  //they know the bot has seen the message

  send.sendReadReceipt(senderId);
  // this part needs to call API.AI with the message text
  // for now this will echo the text being received
  const receiveMessageAndSend = (message, messagingEvent, senderId) => {
    if (message.quick_reply) {
      //assuming payload is an object that has type and data
      const { type, data } = JSON.parse(
        messagingEvent.message.quick_reply.payload
      );
      //On Tue May 17 format of user and page ids delivered via webhooks will change from an int to a string
      const senderId = messagingEvent.sender.id.toString();
      // runner does stuff with API.ai and webhook
      switch (type) {
        case "see-menu":
          //creates New Order
          runner.renewSession(senderId).then(order => {
            send.sendMenuMessage(senderId, order._session);
          });
          break;
        case "see-special-burgers":
          runner.renewSession(senderId).then(order => {
            send.sendSpecialBurgerMenu(senderId);
          });
          break;
        case "see-normal-burgers":
          runner.renewSession(senderId).then(order => {
            send.sendNormalBurgerMenu(senderId);
          });
          break;
        case "see-drinks":
          runner.renewSession(senderId).then(order => {
            send.sendDrinkMenuMessage(senderId);
          });
          break;

        case "see-fries":
          runner.renewSession(senderId).then(order => {
            send.sendFriesMenuMessage(senderId);
          });
          break;
        case "upgrade-combo":
          runner
            .upgradeCombo(senderId)
            .then(() => {
              send.sendOrderedMessage(senderId);
            })
            .catch(err => console.log(err));
          break;
        case "order-continue":
          runner
            .renewSession(senderId)
            .then(() => {
              send.sendOrderedMessage(senderId);
            })
            .catch(err => console.log(err));
          break;
        case "confirm-order":
          runner.confirmOrder(senderId).then(() => {
            send.sendInitializeMessage(senderId);
          });
          break;
        default:
          console.log(`unknown postback called ${type}`);
          break;
      }
    } else if (message.text === "generic") {
      send.sendGenericTemplate(senderId);
    } else if (message.text) {
      send.sendEchoMessage(senderId);
      console.log(message.text);
    }
  };
if (message) {
  runner.initialize(senderId).then(isActive => {
    console.log(isActive)
    if (isActive) {
      send.sendInitializeMessage(senderId);
    }
    else {
      sendInitializeMessage(senderId);
    }
  });
}


};
module.exports = {
  handleReceiveMessage
};
