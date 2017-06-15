function promiseHelper (req, res, operation) {
  operation
    .then((success) => {
      res.send(success)
    }).catch((err) => res.send(err));
};


module.exports = promiseHelper;