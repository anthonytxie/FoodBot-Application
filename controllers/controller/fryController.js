const fryController = {};
const fryDAO = require('./../../db/DAO/fryDAO');
const {promiseHelper } = require('./..//helpers/helper-functions');


fryController.post =  (req, res, result, session) => {
  fryDAO.post(result, session)
   .then((order) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Authorization', 'Bearer ' + 'a92a16035b1b441897e1654f7e17478a' )
        let body =  {
          speech: 'you added one fry!!',
          displayText: 'you got one fry!!',
          data: {},
          contextOut: [],
          source: "Pepe",
          followupEvent: {}
        };
        return res.send(body);    
        });
};


module.exports = fryController;
