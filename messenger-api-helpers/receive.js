// this should handle the reception of all postbacks, messages, and other posts by Messenger API

const send = require('./send');
const runner = require('./runner');

const handleReceiveMessage = (messagingEvent) => {
  const message = messagingEvent.message;
  //On Tue May 17 format of user and page ids delivered via webhooks will change from an int to a string 
  const senderId = messagingEvent.sender.id.toString();

  // good practice to send a read receipt so if user is waiting for a response 
  //they know the bot has seen the message

  send.sendReadReceipt(senderId);
  // this part needs to call API.AI with the message text
  // for now this will echo the text being received

  if (message.text === 'generic') {
    send.sendGenericTemplate(senderId)
  }
  else if (message.text) {
    send.sendEchoMessage(senderId, message.text);
    console.log(message.text)
    
  }
};



const handleQuickReply = (messagingEvent) => {
  //assuming payload is an object that has type and data
  const {type, data} = JSON.parse(messagingEvent.quick_reply.payload); 
  //On Tue May 17 format of user and page ids delivered via webhooks will change from an int to a string 
  const senderId = messagingEvent.sender.id.toString();
// runner does stuff with API.ai and webhook
  switch (type) {
    case 'see-burgers':
      runner.showBurgerMenu(senderId)
        .then((order)=> {
          send.sendBurgerMenuMessage(senderId, order._session)
        })
      break;  

    case 'see-drinks':
      runner.showDrinkMenu(senderId)
        .then((order)=> {
          send.sendDrinkMenuMessage(senderId, order._session)
        })
      break;  

    case 'see-fries':
      runner.showFriesMenu(senderId)
        .then((order)=> {
          send.sendFriesMenuMessage(senderId, order._session)
        })
      break;  
    default:
      console.log(`unknown postback called ${type}`)
      break;
  }
};


const handleReceivePostback = (messagingEvent) => {
  //assuming payload is an object that has type and data
  const {type, data} = JSON.parse(messagingEvent.postback.payload); 
  //On Tue May 17 format of user and page ids delivered via webhooks will change from an int to a string 
  const senderId = messagingEvent.sender.id.toString();
// runner does stuff with API.ai and webhook
  switch (type) {
    case 'initialize':
      runner.initialize(senderId)
        .then((user)=> {
          send.sendInitializeMessage(senderId, user.PSID)
        })
      break;

    case 'see-menu':
      runner.showMenu(senderId)
        .then((order)=> {
          send.sendMenuMessage(senderId, order._session)
        })
      break;  
    case 'see-burgers':
      runner.showBurgerMenu(senderId)
        .then((order)=> {
          send.sendBurgerMenuMessage(senderId, order._session)
        })
      break;  

    case 'see-drinks':
      runner.showDrinkMenu(senderId)
        .then((order)=> {
          send.sendDrinkMenuMessage(senderId, order._session)
        })
      break;  

    case 'see-fries':
      runner.showFriesMenu(senderId)
        .then((order)=> {
          send.sendFriesMenuMessage(senderId, order._session)
        })
      break;  
    case 'order-item':
      runner.addItemtoOrder(senderId, data)
        .then((order) => {
          send.sendOrderMessage(senderId, order._id)
        }).catch((err) => console.log(err));
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




module.exports = { handleReceiveMessage, handleReceivePostback, handleQuickReply };





