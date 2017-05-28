const orderController = {};
const Order = require('./../db/models/Order')



orderController.post = (req, res) => {
  const user = req.session.user;
  const order = new Order({
    _user: user._id,
  });
  order.save()
    .then((order) => {
      res.status(400).send(order)
    })
};









orderController.getMostRecentOrder = (req, res) => {
  const user = req.session.user;
  Order.findOne({_user: user._id}).sort({createdAt: -1})
    .then((order) => {
      if (!order) {
        return res.send('Would you like to make a new order?');
      }
      else if(order.isConfirmed) {
        res.send('Would you like to order the same thing as last time?');
      }

      else if (!order.isConfirmed) {
        res.send('Would you like to continue where you left off on your last order?');
      }
    });
};








module.exports = orderController;