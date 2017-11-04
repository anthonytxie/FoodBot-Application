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
          runner.createNewLink(senderId)
            .then(link => {
              send.sendBurgerOrderPrompt(senderId, data, link._id);
            }).catch(err => console.log(err));
          break;
        case "order-side":
          if (data.foodObject.itemName === "Cheesy Fries" || data.foodObject.itemName === "Poutine" ) {
            runner.renewSessionAndReturnOrder(senderId)
              .then((order) => {
                return runner.addSideToOrder(senderId, { itemName: data.foodObject.itemName})
              })
              .then(() => {
                send.sendOrderedMessage(senderId);
              })
          } 
            else if (data.foodObject.itemName === "Fries") {
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
          runner
            .addBurgerToOrder(senderId, data)
            .then((burger) => {
              send.sendOrderedBurgerUpsizeMessage(senderId, burger._link)
            })
            .catch(err => console.log(err));
          break;
        case "order-no-combo":
          runner
            .removeComboItems(senderId, data.linkId)
            .then(() => {
              send.sendOrderedMessage(senderId);
            })
            .catch(err => console.log(err));
          break;
        case "edit-order":
          runner
            .renewSessionAndReturnOrder(senderId)
            .then(order => {
              send.sendEditOrderMessage(senderId);
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