const mongoose = require("mongoose");
const { Schema } = mongoose;
const { disciminatorOptions } = require("./settings/schemaSettings");

const sideSchema = new Schema(
  {
    itemType: {
      type: String,
      default: "side"
    },
    itemName: {
      type: String,
      enum: ["fries", "poutine", "cheesyFries"]
    },

    itemSize: {
      type: String,
      enum: ["small", "medium", "large"]
    },

    itemCombo: {
      type: Boolean,
      default: false
    }
  },
  disciminatorOptions
);

sideSchema.virtual("price").get(function() {
  if (this.itemCombo) {
    if (this.itemName === "poutine") {
      return 6.0;
    } else if (this.itemName === "cheesyFries") {
      return 4.5;
    } else if (this.itemName === "fries") {
      return 2.0;
    } 
  }
  else {
    if (this.itemName ==="cheesyFries") {
      return 6.49;
    }
    else if (this.itemName ==="poutine") {
      return 7.99;
    }
    else if (this.itemName ==="fries") {
      if (this.itemSize ==="medium") {
        return 3.99;
      }
      else if (this.itemSize ==="large") {
        return 4.99;
      }
    }
  }
});


module.exports = { sideSchema };