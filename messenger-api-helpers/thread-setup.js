// ===== MESSENGER =============================================================
const messages = require('./messages');
const sendApi = require( './sendApi');

//Sets the persistent menu for the application

const setPersistentMenu = () => {
  sendApi.callThreadAPI(messages.persistentMenu);
};

//Sets the Get Started button for the application

const setGetStarted = () => {
  sendApi.callThreadAPI(messages.getStarted);
};



setPersistentMenu()

module.exports = { setPersistentMenu, setGetStarted };

