function userPromiseHelper (req, res, operation) {
  operation
    .then((success) => {
      req.session.user = success;
      res.send(success);
    }).catch((err) => res.send(err));
};


function orderPromiseHelper (req, res, sessionId, findOrderBySession, operation) {
  findOrderBySession(sessionId)
    .then((order) => {
      return order
    }).catch((err) => res.send(err));
    operation(order)
      .then()
};

function promiseHelper (req, res, operation) {
  operation
    .then((success) => {
      res.send(success);
    }).catch((err) => res.send(err));
};


module.exports =  {promiseHelper, userPromiseHelper, orderPromiseHelper };