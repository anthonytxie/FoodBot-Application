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

    isPaid: {
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

const addAttributes = attribute => (startingValue, item) =>
  startingValue + item[attribute];

const sumPriceAndRound = (array, reduceTransformation, startingValue) =>
  Math.round(array.reduce(reduceTransformation, startingValue));

orderSchema.virtual("basePrice").get(function() {
  return Math.round(sumPriceAndRound(this._items, addAttributes("price"), 0));
});

orderSchema.virtual("tax").get(function() {
  return Math.round(sumPriceAndRound(this._items, addAttributes("price"), 0) * 0.13);
});

orderSchema.virtual("stripeFee").get(function() {
  return (
    Math.round((sumPriceAndRound(this._items, addAttributes("price"), 0) * 1.13 * 0.029) + 30)
  );
});

orderSchema.virtual("deliveryFee").get(function() {
  let highDeliveryFee = 700;
  let lowDeliveryFee = 300;
  let orderThreshold = 1500;

  if (
    sumPriceAndRound(this._items, addAttributes("price"), 0) < orderThreshold
  ) {
    return highDeliveryFee;
  } else {
    return lowDeliveryFee;
  }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
