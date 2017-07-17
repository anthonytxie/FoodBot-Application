// ===== MESSENGER =============================================================
const messages = require('./messages');
const sendApi = require( './sendApi');

//Sets the persistent menu for the application

const setPersistentMenu = () => {
  sendApi.callThreadAPI('messenger_profile', messages.persistentMenu);
};

//Sets the Get Started button for the application

const setGetStarted = () => {
  sendApi.callThreadAPI('messenger_profile', messages.getStarted);
};



setPersistentMenu()
setGetStarted()
module.exports = { setPersistentMenu, setGetStarted };

