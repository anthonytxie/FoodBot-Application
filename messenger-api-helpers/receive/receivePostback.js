const send = require('./../send');
const runner = require('./../runner');


const handleReceivePostback = (messagingEvent) => {
  //assuming payload is an object that has type and data
  const {type, data} = JSON.parse(messagingEvent.postback.payload); 
  //On Tue May 17 format of user and page ids delivered via webhooks will change from an int to a string 
  const senderId = messagingEvent.sender.id.toString();
// runner does stuff with API.ai and webhook
  switch (type) {
    case 'initialize':
      runner.initialize(senderId)
        .then(()=> {
          send.sendInitializeMessage(senderId)
        })
      break;
    case 'see-menu':
      runner.createNewOrder(senderId)
        .then((order)=> {
          send.sendMenuMessage(senderId, order._session)
        })
      break;  
    case 'create_new_order':
      runner.createNewOrder(senderId)
        .then((order)=> {
          send.sendOrderMessage(senderId, order._id)
        })
      break;  
    case 'show-burger':
      runner.renewSession(senderId, data)
      .then((order) => {
        send.sendBurgerOrderPrompt(senderId, data)
      }).catch((err) => console.log(err));
      break;
    case 'order-burger':
      if (data.customize === false) {      
          runner.addItemtoOrder(senderId, data)
          .then((order) => {
            send.sendOrderedBurgerUpsizeMessage(senderId, data)
          }).catch((err) => console.log(err));
        }
      else {
      }
      break;
    case 'delete-last-item':
      runner.deleteMostRecentItemAdded(senderId)
        .then((order) => {
          send.sendOrderMessage(senderId, order._id)
        }).catch((err) => console.log(err));
      break;
    case 'confirm-order':
      runner.confirmOrder(senderId)
        .then((order) => {
          send.sendOrderMessage(senderId, order._id)
        }).catch((err) => console.log(err));
      break;
    case 'unconfirm-order':
      runner.unconfirmOrder(senderId)
        .then((order) => {
          send.sendOrderMessage(senderId, order._id)
        }).catch((err) => console.log(err));
      break;
    case 'show-current-order':
      runner.showCurrentOrder(senderId)
        .then((order) => {
          send.sendOrderMessage(senderId, order._id)
        }).catch((err) => console.log(err));
      break;

    default:
      console.log(`unknown postback called ${type}`)
      break;
  }
};

module.exports = { handleReceivePostback };