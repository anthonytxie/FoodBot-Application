const burgerController = {};
const burgerDAO = require('./../../db/DAO/burgerDAO');
const {promiseHelper} = require('./..//helpers/helper-functions');


burgerController.post =  (req, res, result, session) => {
  burgerDAO.post(result, session)
   .then((order) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Authorization', 'Bearer ' + 'a92a16035b1b441897e1654f7e17478a' )
        let body =  {
          speech: 'you added one burger!!',
          displayText: 'you got one burger!!',
          data: {},
          contextOut: [],
          source: "Pepe",
          followupEvent: {}
        };
        return res.send(body);    
        });
  };


module.exports = burgerController;
