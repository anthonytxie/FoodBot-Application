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
      type: Boolean,
      default: false
    }
  },
  disciminatorOptions
);

drinkSchema.virtual("price").get(function() {
  if (this.itemCombo) {
    if (this.itemName.includes('Milkshake')) {
      return 299
    }
    else {
      return 129
    }
  } else {
    let price;
    switch (this.itemName) {
      case "Vanilla Milkshake":
        return 399;
        break;
      case "Chocolate Milkshake":
        return 399;
        break;
      case "Strawberry Milkshake":
        return 399;
        break;
      case "Mountain Dew":
        return 247;
        break;
      case "Water Bottle":
        return 247;
        break;
      default:
        return 137;
        break;
    }
  }
});

module.exports = { drinkSchema };