const express = require('express');
// const controller = require('./../controllers/index');
const orderController = require('./../controllers/controller/orderController');

const routes = express();
const receiveApi = require('../messenger-api-helpers/receive');
const {itemController} = require('./../controllers/controller/itemController');



routes.post('/item', itemController.post)
routes.post('/order', orderController.post)
routes.post('/deleteItem', itemController.deleteMostRecentItem)

// //homepage 

// routes.get('/', (req, res) => {
//   res.send('hello welcome to the foodbot API')
// })

// // //User

// //post with phoneNumber.. this will retreive an existing user and initialize a session for them or this will create a new user and initalize a session for them. should always be called at the beginning of a convo.
// routes.post('/', controller.Post);


// // Verify Token 
// //need to put secret in process.env

// routes.get('/webhook', (req, res) => {
//   if (req.query['hub.verify_token'] === process.env.secret ) {
//     res.send(req.query['hub.challenge']);
//   } else {
//     res.send('Error, wrong token');
//   }
// });


// routes.post('/webhook', (req, res) => {
//   /*
//     You must send back a status of 200(success) within 20 seconds
//     to let us know you've successfully received the callback.
//     Otherwise, the request will time out.

//     When a request times out from Facebook the service attempts
//     to resend the message.

//     This is why it is good to send a response immediately so you
//     don't get duplicate messages in the event that a request takes
//     awhile to process.
//   */
//   res.sendStatus(200);

//   const data = req.body;

//   // Make sure this is a page subscription
//   if (data.object === 'page') {
//     // Iterate over each entry
//     // There may be multiple if batched
//     data.entry.forEach((pageEntry) => {
//       // Iterate over each messaging event and handle accordingly
//       pageEntry.messaging.forEach((messagingEvent) => {
//         console.log({messagingEvent});
//         if (messagingEvent.message) {
//           receiveApi.handleReceiveMessage(messagingEvent);
//         } else if (messagingEvent.postback) {
//           receiveApi.handleReceivePostback(messagingEvent);
//         } else if (messagingEvent.delivery) {
//             console.log('delivery')
//         }
//           else if (messagingEvent.read) {
//             console.log('read')
//         }
//           else if (messagingEvent.optin) {
//             console.log('auth log in')
//           }
//           else if (messagingEvent.account_linking) {
//             console.log('account link')
//           }
//           else {
//             console.log(
//               'Webhook received unknown messagingEvent: ',
//               messagingEvent
//             );
//           }
//       });
//     });
//   }
// });

// routes.get('/orders', orderController.showAllOrders);





module.exports = routes;