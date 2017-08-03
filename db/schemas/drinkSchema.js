const mongoose = require("mongoose");
const { Schema } = mongoose;
const { disciminatorOptions } = require("./settings/schemaSettings");

const drinkSchema = new Schema(
  {
    itemType: {
      type: String,
      default: "drink"
    },
    itemName: {
      type: String,
      enum: [
        "pepsi",
        "dietPepsi",
        "7-up",
        "crushOrange",
        "dr.pepper",
        "icedTea",
        "gingerAle",
        "rootBeer",
        "waterBottle",
        "mountainDew",
        "vanillaMilkshake",
        "chocolateMilkshake",
        "strawberryMilkshake"
      ]
    },
    itemCombo: {
      type: Boolean
    }
  },
  disciminatorOptions
);

drinkSchema.virtual("price").get(function() {
  if (this.itemCombo) {
    if (this.itemName.includes('Milkshake')) {
      return 2.99
    }
    else {
      return 1.29
    }
  } else {
    let price;
    switch (this.itemName) {
      case "vanillaMilkshake":
        return 3.99;
        break;
      case "chocolateMilkshake":
        return 3.99;
        break;
      case "strawberryMilkshake":
        return 3.99;
        break;
      case "mountainDew":
        return 2.47;
        break;
      case "waterBottle":
        return 2.47;
        break;
      default:
        return 1.37;
        break;
    }
  }
});

module.exports = { drinkSchema };