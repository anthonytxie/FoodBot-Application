const orderController = {};
const Order = require('./../db/models/Order')



orderController.postNewOrder = (req, res) => {
  const user = req.session.user;
  const order = new Order({
    _user: user._id,
  });
  order.save()
    .then((order) => {
      req.session.order = order;
      res.status(400).send(order)
    });
};


// note for later.... I think API.ai only takes post requests.... 

 
orderController.getAllOrdersFromUser = (req ,res) => {
  const user = req.session.user;
  Order.find({_user: user._id}).sort({createdAt: -1})
    .then((orders) => {
      return res.status(200).send(orders);
    }).catch((err) => {
      return res.status(400).send(err);
    });
};


orderController.getCurrentOrder = (req,res) => {
  const order = req.session.order;
  Order.findOne({_id: order._id})
    .then((order) => {
      return res.status(200).send(order);
    }).catch((err) => {
      return res.status(400).send(err);
    });
};




orderController.getMostRecentOrder = (req, res) => {
  const user = req.session.user;
  Order.findOne({_user: user._id}).sort({createdAt: -1})
    .then((order) => {
      if (!order) {
        return res.send('Would you like to make a new order?');
      }
      else if(order.isConfirmed) {
        req.session.order = order
        res.send('Would you like to order the same thing as last time?');
      }

      else if (!order.isConfirmed) {
        req.session.order = order
        res.send('Would you like to continue where you left off on your last order?');
      }
    });
};








module.exports = orderController;