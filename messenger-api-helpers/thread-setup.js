// ===== MESSENGER =============================================================
const messages = require('./messages');
const sendApi = require( './sendApi');

//Sets the Get Started button for the application
const setGetStarted = () => {
  sendApi.callThreadAPI('messenger_profile', messages.getStarted);
};

//Sets the persistent menu for the application

const setPersistentMenu = () => {
  sendApi.callThreadAPI('messenger_profile', messages.persistentMenu);
};

setGetStarted()
setPersistentMenu()

module.exports = { setPersistentMenu, setGetStarted };




// WhiteList Domain
/*
curl -X POST -H "Content-Type: application/json" -d '{
  "setting_type" : "domain_whitelisting",
  "whitelisted_domains" : ["https://a02c8e98.ngrok.io"],
  "domain_action_type": "add"
}' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=EAACAWcKsWncBAKykRZANUSEH3ah8Fk6GoW8ZBFSQ5BZC1JoQwHZAOUUVgV4q7be0gNPAXhRycAyw87L6rinDKJDtUkx8BFGMeu7uxZCCyNg2zfmlUWCAgEVIOBZA8VO8SZAoV3S9Y3WL5UcaLuYZAwiQdLZB90h95e29W9munWusYpQZDZD"
*/