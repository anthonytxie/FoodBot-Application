const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const schemaOptions =  require('./settings/schemasettings');

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

  isConfirmed: {
    type: Boolean,
    default: false
  },

  isDelivery: {
    type: Boolean,
    default: false 
  },

  isDeleted: {
    type: Boolean,
    default: false
  }
}, schemaOptions)

orderSchema.virtual('orderPrice').get(function() {
  let price = 0
  for (let item of this._burgers) {
    price = price + item.price
  }
  return price
});



const Order = mongoose.model('Order', orderSchema);

module.exports = Order;