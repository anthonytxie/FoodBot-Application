const express = require('express');
const routes = express();
const { handleReceivePostback } = require('../../messenger-api-helpers/receive/receivePostback')
const { handleReceiveMessage } = require('../../messenger-api-helpers/receive/receiveMessage')


// Verify Token 
//need to put secret in process.env

routes.get('/', (req, res) => {
  res.send('hello welcome to foodbot api')
})


routes.get('/webhook', (req, res) => {
  if (req.query['hub.verify_token'] === process.env.secret ) {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong token');
  }
});


routes.post('/webhook', (req, res) => {
  /*
    You must send back a status of 200(success) within 20 seconds
    to let us know you've successfully received the callback.
    Otherwise, the request will time out.

    When a request times out from Facebook the service attempts
    to resend the message.

    This is why it is good to send a response immediately so you
    don't get duplicate messages in the event that a request takes
    awhile to process.
  */
  res.sendStatus(200);

  const data = req.body;

  // Make sure this is a page subscription
  if (data.object === 'page') {
    // Iterate over each entry
    // There may be multiple if batched
    data.entry.forEach((pageEntry) => {
      // Iterate over each messaging event and handle accordingly
      pageEntry.messaging.forEach((messagingEvent) => {
        console.log({messagingEvent});
        if (messagingEvent.postback) {
          handleReceivePostback(messagingEvent);
        } 
        else if (messagingEvent.message) {
          handleReceiveMessage(messagingEvent);
        }
        else if (messagingEvent.delivery) {
            console.log('delivery')
        }
        else if (messagingEvent.read) {
            console.log('read')
        }
        else if (messagingEvent.optin) {
            console.log('auth log in')
          }
        else if (messagingEvent.account_linking) {
            console.log('account link')
          }
        else {
            console.log(
              'Webhook received unknown messagingEvent: ',
              messagingEvent
            );
          }
      });
    });
  }
});





module.exports = routes;