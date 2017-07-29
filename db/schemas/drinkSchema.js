const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const { disciminatorOptions } = require("./settings/schemaSettings");

const drinkSchema = new Schema(
  {
    itemType: {
      type: String,
      default: "drink"
    },
    drinkName: {
      type: String,
      enum: [
        "Pepsi",
        "Diet Pepsi",
        "7-Up",
        "Crush Orange",
        "Dr.Pepper",
        "Iced Tea",
        "Ginger Ale",
        "Root Beer",
        "Water Bottle",
        "Mountain Dew",
        "Milkshake"
      ]
    }
  },
  disciminatorOptions
);

drinkSchema.virtual("price").get(function() {
  let price;
  switch (this.drinkName) {
    case "Milkshake":
      return 3.99;
      break;
    case "Mountain Dew":
      return 2.47
      break;
    case "Water Bottle":
      return 2.47;
      break;
    default:
      return 1.37;
      break;
  }
});

module.exports = { drinkSchema };