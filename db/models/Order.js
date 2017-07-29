const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const { schemaOptions } =  require('../schemas/settings/schemaSettings');

const orderSchema = new Schema({
  _user: {
    type: Schema.ObjectId,
    ref: 'User'
  },

  _session: {
    type: Schema.ObjectId,
    ref: 'Session'
  },

  _items: [{
    type: Schema.ObjectId,
    ref: "Item"
  }],

  createdAt: {
    type: Date,
    default: Date.now
  },

  isCompleted: {
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

}, schemaOptions)

// orderSchema.virtual('orderPrice').get(function() {
//   let price = 0
//   for (let item of this._items) {
//     price = price + item.price
//   }
//   return price.toFixed(2)
// });



const Order = mongoose.model('Order', orderSchema);

module.exports = Order;