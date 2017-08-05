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
            runner.renewSession(senderId).then(order => {
              send.sendSpecialBurgerMenu(senderId);
            });
            break;
          case "see-normal-burgers":
            runner.renewSession(senderId).then(order => {
              send.sendNormalBurgerMenu(senderId);
            });
            break;
          case "see-sides":
            runner.renewSession(senderId).then(order => {
              send.sendSideMenu(senderId);
            });
            break;
          case "upgrade-combo":
            runner
              .upgradeCombo(senderId)
              .then((order) => {
                send.sendOrderedMessage(senderId,order);
              })
              .catch(err => console.log(err));
            break;
          default:
            console.log(`unknown postback called ${type}`);
            break;
        }
      } else if (message.text === "generic") {
        send.sendGenericTemplate(senderId);
      } else if (message.text) {
        send.sendGenericMessage(senderId);
      } else {
        send.sendGenericMessage(senderId);
      }
    } else {
      runner.initialize(senderId).then(() => {
        send.sendInitializeMessage(senderId);
      });
    }
  });
};

module.exports = {
  handleReceiveMessage
};
