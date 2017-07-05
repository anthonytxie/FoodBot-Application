const milkshakeController = {};
const milkshakeDAO = require('./../../db/DAO/milkshakeDAO');
const {promiseHelper} = require('./..//helpers/helper-functions');


milkshakeController.post =  (req, res, result, session) => {
  milkshakeDAO.post(result, session)
   .then((order) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Authorization', 'Bearer ' + 'a92a16035b1b441897e1654f7e17478a' )
        let body =  {
          speech: 'you added one milkshake!!',
          displayText: 'you got one milkshake!!',
          data: {},
          contextOut: [],
          source: "Pepe",
          followupEvent: {}
        };
        return res.send(body);    
        });
};


module.exports = milkshakeController;
