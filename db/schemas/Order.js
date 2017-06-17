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

orderSchema.virtual('itemArray').get(function() {
  let orderArray = []
  let appendItems = function(items,description) {
    for (let item of items ) {
      let list = [item._id, item.createdAt, description ];
      orderArray.push(list)
    };
  };
  appendItems(this._burgers, 'burger')
  appendItems(this._drinks, 'drink')
  appendItems(this._milkshakes, 'milkshake')
  appendItems(this._fries, 'fry')

  let orderedArray = orderArray.sort((a,b)=> {
    return a[0] < b[0];
  });
  return orderedArray;
 
});



const Order = mongoose.model('Order', orderSchema);

module.exports = Order;