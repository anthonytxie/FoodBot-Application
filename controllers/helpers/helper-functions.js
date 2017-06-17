function userPromiseHelper (req, res, operation) {
  operation
    .then((success) => {
      req.session.user = success;
      res.send(success);
    }).catch((err) => res.send(err));
};


function orderPromiseHelper (req, res, operation) {
  operation
    .then((success) => {
      req.session.order = success;
      res.send(success);
    }).catch((err) => res.send(err));
};

function promiseHelper (req, res, operation) {
  operation
    .then((success) => {
      res.send(success);
    }).catch((err) => res.send(err));
};


module.exports =  {promiseHelper, userPromiseHelper, orderPromiseHelper };