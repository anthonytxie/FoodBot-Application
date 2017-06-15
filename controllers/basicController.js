const basicController = {};

const userDAO = require('./../db/DAO/userDAO')
const serDAO = require('./../db/DAO/OrderDAO')


basicController.get = (req, res) => {
  res.send('Welcome to the Application');
};

module.exports = basicController;