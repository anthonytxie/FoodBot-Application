const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;


const orderSchema = new Schema({
  _user: {
    type: Schema.ObjectId,
    ref: 'User'
  },

  _burgers: [{
    type: Schema.ObjectId,
    ref: "Burger"
  }],

  _fries: [{
    type: Schema.ObjectId,
    ref: "Fry"
  }],

  _milkshakes: [{
    type: Schema.ObjectId,
    ref: "Milkshake"
  }],

  _drinks: [{
    type: Schema.ObjectId,
    ref: "Drink"
  }],


  createdAt: {
    type: Date,
    default: Date.now
  },

  completed: {
    type: Boolean,
    default: false
  },

  completedAt: {
    type: Date
  },

  isDelivery: {
    type: Boolean,
    default: false 
  },

  isDeleted: {
    type: Boolean,
    default: false
  }
})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;