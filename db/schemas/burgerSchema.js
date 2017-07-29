const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const { disciminatorOptions } = require("./settings/schemaSettings");
const burgerSchema = new Schema(
  {


// ===== Type ===============================================================
    itemName: {
      type: String
    },


    itemType: {
      type: String,
      default: "burger"
    },

// ===== Premium Items ===============================================================


    bunType: {
      type: String,
      enum: ["lettuce", "gluten-free", "grilled-cheese", "standard", "three-part"]
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

    swissCheese: {
      type: Boolean,
      default: false
    },

// ===== Standard Items ===============================================================


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
    },

    ketchup: {
      type: Boolean,
      default: false
    },

    mustard: {
      type: Boolean,
      default: false
    },

    mayo: {
      type: Boolean,
      default: false
    },

    relish: {
      type: Boolean,
      default: false
    },

    fancySauce: {
      type: Boolean,
      default: false
    },

    hotSauce: {
      type: Boolean,
      default: false
    },

    lettuce: {
      type: Boolean,
      default: false
    },

    tomato: {
      type: Boolean,
      default: false
    },

    pickle: {
      type: Boolean,
      default: false
    },

    onion: {
      type: Boolean,
      default: false
    },

    hotPepper: {
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