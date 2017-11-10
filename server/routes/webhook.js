// MODULES
const express = require("express");
const routes = express();

//SEND FUNCTIONS
const {
  handleReceivePostback
} = require("../../messenger-api-helpers/receive/receivePostback");
const {
  handleReceiveMessage
} = require("../../messenger-api-helpers/receive/receiveMessage");
const send = require("../../messenger-api-helpers/send");

routes.get("/", (req, res) => {
  res.status(200).send("hello welcome to foodbot api");
});

// LOGGER
const { logger } = require("./../logger/logger");

routes.get("/webhook", (req, res) => {
  if (req.query["hub.verify_token"] === process.env.secret) {
    res.send(req.query["hub.challenge"]);
  } else {
    res.send("Error, wrong token");
  }
});

routes.post("/webhook", (req, res) => {
  /*
    You must send back a status of 200(success) within 20 seconds
    to let us know you've successfully received the callback.
    Otherwise, the request will time out.
  */
  res.sendStatus(200);

  const data = req.body;

  // Make sure this is a page subscription
  if (data.object === "page") {
    // Iterate over each entry
    // There may be multiple if batched
    data.entry.forEach(pageEntry => {
      // Iterate over each messaging event and handle accordingly
      pageEntry.messaging.forEach(messagingEvent => {
        logger.verbose({ messagingEvent });
        if (messagingEvent.postback) {
          handleReceivePostback(messagingEvent);
        } else if (messagingEvent.message) {
          handleReceiveMessage(messagingEvent);
        } else if (messagingEvent.delivery) {
          logger.verbose("delivery");
        } else if (messagingEvent.read) {
          logger.verbose("read");
        } else if (messagingEvent.optin) {
          logger.verbose("auth log in");
        } else if (messagingEvent.account_linking) {
          logger.verbose("account link");
        } else {
          logger.info(
            "Webhook received unknown messagingEvent: ",
            messagingEvent
          );
        }
      });
    });
  }
});

module.exports = routes;
