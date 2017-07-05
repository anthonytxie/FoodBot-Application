const drinkController = {};
const drinkDAO = require('./../../db/DAO/drinkDAO');
const {promiseHelper} = require('./..//helpers/helper-functions');



drinkController.post =  (req, res, result, session) => {
  drinkDAO.post(result, session)
   .then((order) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Authorization', 'Bearer ' + 'a92a16035b1b441897e1654f7e17478a' )
        let body =  {
          speech: 'you added one drink!!',
          displayText: 'you got one drink!!',
          data: {},
          contextOut: [],
          source: "Pepe",
          followupEvent: {}
        };
        return res.send(body);    
        });
};

module.exports = drinkController;
