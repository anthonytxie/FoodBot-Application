const send = require('./../send');
const runner = require('./../runner');

const handleReceiveMessage = (messagingEvent) => {
  const message = messagingEvent.message;
  //On Tue May 17 format of user and page ids delivered via webhooks will change from an int to a string 
  const senderId = messagingEvent.sender.id.toString();

  // good practice to send a read receipt so if user is waiting for a response 
  //they know the bot has seen the message

  send.sendReadReceipt(senderId);
  // this part needs to call API.AI with the message text
  // for now this will echo the text being received


  if (message.quick_reply) {
   //assuming payload is an object that has type and data
    const {type, data} = JSON.parse(messagingEvent.message.quick_reply.payload); 
    //On Tue May 17 format of user and page ids delivered via webhooks will change from an int to a string 
    const senderId = messagingEvent.sender.id.toString();
  // runner does stuff with API.ai and webhook
    switch (type) {
      case 'see-special-burgers':
        runner.showSpecialBurgerMenu(senderId)
          .then((order)=> {
            send.sendSpecialBurgerMenu(senderId, order._session)
          })
        break;  
      case 'see-normal-burgers':
        runner.showNormalBurgerMenu(senderId)
          .then((order)=> {
            send.sendNormalBurgerMenu(senderId, order._session)
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
  }
    else if (message.text === 'generic') {
    send.sendGenericTemplate(senderId)
    }
    else if (message.text) {
      send.sendBurgerMenuMessage(senderId)
      console.log(message.text)
      
    }
};


module.exports = { handleReceiveMessage };

