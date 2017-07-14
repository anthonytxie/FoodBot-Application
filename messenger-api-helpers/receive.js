// this should handle the reception of all postbacks, messages, and other posts by Messenger API

const send = require('./send');
const runner = require('./runner');

const handleReceiveMessage = (messagingEvent) => {
  const message = messagingEvent.message;
  const senderId = messagingEvent.sender.id;

  // good practice to send a read receipt so if user is waiting for a response 
  //they know the bot has seen the message

  send.sendReadReceipt(senderId);
  // this part needs to call API.AI with the message text
  // for now this will echo the text being received

  if (message.text) {
    send.echoMessage(senderId);
  }
};




const handleReceivePostback = (messagingEvent) => {
  //assuming payload is an object that has type and data
  const {type, data} = JSON.parse(event.postback.payload); 
  const senderId = event.sender.id;

// runner does stuff with API.ai and webhook
  switch (type) {
    case 'initialize':
      runner.initialize()
        .then((success) => {
          send.sendMessage(recipientId, {text: 'hello'})
        }).catch((err) => console.log('initialize function failed'));
      break;
    case 'create_new_order':
      runner.createNewOrder()
        .then((success) => {
          send.sendCreateNewOrderMessage(senderId, success)
        }).catch((err) => console.log('create new order function failed'));
      break;
    case 'order':
      runner.order()
        .then((success) => {
          send.sendOrderMessage(senderId, success)
        }).catch((err) => console.log('order function failed'));
      break;
    default:
      console.log(`unknown postback called ${type}`)
      break;
  }
};


module.exports = { handleReceiveMessage, handleReceivePostback};





