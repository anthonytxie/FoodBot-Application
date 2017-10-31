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
  "whitelisted_domains" : ["https://d06f431c.ngrok.io"],
  "domain_action_type": "add"
}' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=EAACH5pouINQBAHIX0LDyAZCr5ZAzf20ZC5Nm6VZAeL1pLBEzOPxLq0V7ozmrT9NLIhZCMPISZA7RDYRoscJhXB6p956JGsTSrILMPxPNkixYuTEdBdshPmxKITZAzegZASmNyNXjM1C3obfqFjsECiFR5LqykXB4JUnL7rsUcmsoggZDZD"
*/