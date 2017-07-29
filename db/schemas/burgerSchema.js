const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const { disciminatorOptions } = require("./settings/schemaSettings");
const burgerSchema = new Schema(
  {
    //normal shit
    itemType: {
      type: String,
      default: "burger"
    },

    bunType: {
      type: String,
      enum: ["lettuce", "gluten-free", "grilled-cheese"]
    },

    patties: {
      type: Number,
      default: 1,
      trim: true
    },

    stuffedPortobello: {
      type: Boolean,
      default: false
    },

    bacon: {
      type: Boolean,
      default: false
    },

    chickenPatty: {
      type: Boolean,
      default: false
    },

    caramelizedOnions: {
      type: Boolean,
      default: false
    },

    americanCheese: {
      type: Boolean,
      default: false
    },

    blueCheese: {
      type: Boolean,
      default: false
    },

    cheeseSauce: {
      type: Boolean,
      default: false
    },

    gravySide: {
      type: Boolean,
      default: false
    },

    sauteedMushrooms: {
      type: Boolean,
      default: false
    },

    blueCheese: {
      type: Boolean,
      default: false
    },

    swiss: {
      type: Boolean,
      default: false
    },

    fancySauce: {
      type: Boolean,
      default: false
    },

    pickles: {
      type: Boolean,
      default: true
    },

    lettuce: {
      type: Boolean,
      default: true
    },

    tomatoes: {
      type: Boolean,
      default: true
    },

    onions: {
      type: Boolean,
      default: true
    },

    egg: {
      type: Boolean,
      default: false
    }
  },
  disciminatorOptions
);

burgerSchema.virtual("price").get(function() {
  return (
    4 +
    this.patties * 2 +
    this.cheddar * 1 +
    this.swiss * 1 +
    this.blueCheese * 1
  );
});

module.exports = { burgerSchema };