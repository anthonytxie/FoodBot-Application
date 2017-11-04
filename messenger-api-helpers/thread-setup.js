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
  "whitelisted_domains" : ["https://85d7425a.ngrok.io"],
  "domain_action_type": "add"
}' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=EAAVE0uGR6A4BAEDoL8rLiaFAruEcB5f1x7zGBlF74fiPkIKcH8AZBkJfqZC63rAldw8TJbuyRZCUNLTG9Wilr1lDqzvPK4n0QiYTSV1vcJ1w2XSKY9ZANEov2q4hRZBA6hKhFuwZCtfWsSi5gOf3dMLKq8PggBcTQEbZBGF8xbS0nyuS1UUcK5P"
*/