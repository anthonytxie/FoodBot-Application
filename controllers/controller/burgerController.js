const burgerController = {};
const burgerDAO = require('./../../db/DAO/burgerDAO');
const {promiseHelper} = require('./..//helpers/helper-functions');


burgerController.post =  (req, res, result, session) => {
  burgerDAO.post(result, session)
    .then((order) => {
      res.setHeader('Content-Type', 'application/json'); 
      let body = {
        "speech": "you just added a burger",
        "displayText": "you just added a burger",
        "data": {},
        "contextOut" : {},
        "source": "foodbot"
      }
      res.send(body);
    });
};

module.exports = burgerController;
