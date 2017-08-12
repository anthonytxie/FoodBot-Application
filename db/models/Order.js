const mongoose = require('mongoose');
const { Schema } = mongoose;
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

  isConfirmed: {
    type: Boolean,
    default: false
  },

  isPaid: {
    type: Boolean,
    default: false
  },

  stripeToken: {
    type: String,
  },

  methodFulfillment: {
    type: String,
  },

  address: {
    type: String
  },

  postalCode: {
    type: String
  },

  fulfillmentDate: {
    type: Date
  },

  isCompleted: {
    type: Boolean,
    default: false
  },

  completedAt: {
    type: Date
  },

}, schemaOptions)

orderSchema.virtual('orderPrice').get(function() {
  let price = 0
  for (let item of this._items) {
    price = price + item.price
  }
  return price.toFixed(2)
});

// orderSchema.virtual('orderCombo').get(function() {
//   let comboArray = []
//   let array=[]

//   for (i=0; i < this._items.length; i++) {
//     if (this._items[i].itemCombo) {
//       if (this._items[i-1].itemType  === "burger" ) {
//         array.push(this._items[i-1])
//       } else {
//         array.push(this._items[i-1])
//         array.push(this._items[i])
//       }
//     }
//   }

//   while (array.length > 0)
//     comboArray.push(array.splice(0,3));

//   return comboArray;
// })


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;