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
        "Pepsi",
        "Diet Pepsi",
        "7-Up",
        "Orange Crush",
        "Dr Pepper",
        "Iced Tea",
        "Ginger Ale",
        "Rootbeer",
        "Water Bottle",
        "Mountain Dew",
        "Vanilla Milkshake",
        "Chocolate Milkshake",
        "Strawberry Milkshake"
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
      case "Vanilla Milkshake":
        return 3.99;
        break;
      case "Chocolate Milkshake":
        return 3.99;
        break;
      case "Strawberry Milkshake":
        return 3.99;
        break;
      case "Mountain Dew":
        return 2.47;
        break;
      case "Water Bottle":
        return 2.47;
        break;
      default:
        return 1.37;
        break;
    }
  }
});

module.exports = { drinkSchema };