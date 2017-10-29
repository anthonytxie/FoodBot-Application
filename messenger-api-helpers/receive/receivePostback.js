const send = require("./../send");
const runner = require("./../runner");

const handleReceivePostback = messagingEvent => {
  //assuming payload is an object that has type and data
  const { type, data } = JSON.parse(messagingEvent.postback.payload);
  //On Tue May 17 format of user and page ids delivered via webhooks will change from an int to a string
  const senderId = messagingEvent.sender.id.toString();
  // runner does stuff with API.ai and webhook

  runner.isSessionActive(senderId).then(isSessionActive => {
    if (isSessionActive) {
      switch (type) {
        case "initialize":
          runner.initialize(senderId).then(() => {
            send.sendInitializeMessage(senderId);
          });
          break;
        case "see-menu":
          runner.renewSession(senderId).then(order => {
            send.sendMenuMessage(senderId);
          });
          break;
        case "create-new-order":
          runner.createNewOrder(senderId).then(order => {
            send.sendMenuMessage(senderId);
          });
          break;
        case "show-burger":
          runner.createNewLinkAndReturnLinkAndOrderIds(senderId)
            .then(package => {
              send.sendBurgerOrderPrompt(senderId, data, package);
            }).catch(err => console.log(err));
          break;
        case "order-side":
          if (data.foodObject.itemName === "cheesyFries" || data.foodObject.itemName === "poutine" ) {
            runner.renewSessionAndReturnOrder(senderId)
              .then((order) => {
                return runner.addSideToOrder(senderId, {foodObject: { itemName: data.foodObject.itemName}, orderId: order._id})
              })
              .then((order) => {
                send.sendOrderedMessage(senderId, order);
              })
          } 
            else if (data.foodObject.itemName === "fries") {
              runner.renewSessionAndReturnOrder(senderId).then(order => {
                send.askFriesSize(senderId, order);
              });
            } else if (data.foodObject.itemName === "milkshake") {
              runner.renewSessionAndReturnOrder(senderId).then(order => {
                send.askMilkshakeFlavor(senderId, order);
              });
            }
          
          break;
        case "order-burger":
          runner
            .addBurgerToOrder(senderId, data)
            .then(order => {
              send.sendOrderedBurgerUpsizeMessage(senderId, order);
            })
            .catch(err => console.log(err));
          break;
        case "order-continue":
          runner
            .renewSessionAndReturnOrder(senderId)
            .then(order => {
              send.sendOrderedMessage(senderId, order);
            })
            .catch(err => console.log(err));
          break;
        case "edit-order":
          runner
            .renewSessionAndReturnOrder(senderId)
            .then(order => {
              send.sendEditOrderMessage(senderId, order);
            })
            .catch(err => console.log(err));
          break;

          
        default:
          console.log(`unknown postback called ${type}`);
          break;
      }
    } else {
      runner.initialize(senderId).then(() => {
        send.sendInitializeMessage(senderId);
      });
    }
  });
};

module.exports = { handleReceivePostback };