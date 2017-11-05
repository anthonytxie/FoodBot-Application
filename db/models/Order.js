const mongoose = require("mongoose");
const { Schema } = mongoose;
const { schemaOptions } = require("../schemas/settings/schemaSettings");

const orderSchema = new Schema(
  {
    _user: {
      type: Schema.ObjectId,
      ref: "User"
    },

    _session: {
      type: Schema.ObjectId,
      ref: "Session"
    },

    _items: [
      {
        type: Schema.ObjectId,
        ref: "Item"
      }
    ],

    createdAt: {
      type: Date,
      default: Date.now
    },

    isConfirmed: {
      type: Boolean,
      default: false
    },

    stripeToken: {
      type: String
    },

    methodFulfillment: {
      type: String
    },

    address: {
      type: String,
      trim: true
    },

    postalCode: {
      type: String,
      trim: true
    },

    fulfillmentDate: {
      type: Date
    },

    orderConfirmDate: {
      type: Date
    },

    // whether the cashier has inserted it into the system
    isInputted: {
      type: Boolean,
      default: false
    },

    // whether they are done cooking it
    isReady: {
      type: Boolean,
      default: false
    },

    inputDate: {
      type: Date
    },

    orderNumber: {
      type: String
    }
  },
  schemaOptions
);

orderSchema.virtual("basePrice").get(function() {
  let price = 0;
  for (let item of this._items) {
    price = price + item.price;
  }
  return price.toFixed(2);
});

orderSchema.virtual("tax").get(function() {
  let price = 0;
  for (let item of this._items) {
    price = price + item.price;
  }
  return (price*1.13).toFixed(2);
});


orderSchema.virtual("stripeFee").get(function() {
  let price = 0;
  for (let item of this._items) {
    price = price + item.price;
  }
  return (((price*1.13)*0.029)+0.3).toFixed(2);
});

orderSchema.virtual("deliveryFee").get(function() {
  let price = 0;
  for (let item of this._items) {
    price = price + item.price;
  }
  let highDeliveryFee = 7;
  let lowDeliveryFee = 3;
  let orderThreshold = 15;
  if (price < orderThreshold) {
    return highDeliveryFee
  }
  else {
    return lowDeliveryFee
  }

});


const Order = mongoose.model("Order", orderSchema);

module.exports = Order;