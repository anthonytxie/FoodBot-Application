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
      enum: ["Fries", "Poutine", "Cheesy Fries"]
    },

    itemSize: {
      type: String,
      enum: ["Small", "Medium", "Large"]
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
    if (this.itemName === "Poutine") {
      return 600;
    } else if (this.itemName === "Cheesy Fries") {
      return 450;
    } else if (this.itemName === "Fries") {
      return 200;
    } 
  }
  else {
    if (this.itemName ==="Cheesy Fries") {
      return 649;
    }
    else if (this.itemName ==="Poutine") {
      return 799;
    }
    else if (this.itemName ==="Fries") {
      if (this.itemSize ==="Medium") {
        return 399;
      }
      else if (this.itemSize ==="Large") {
        return 499;
      }
    }
  }
});


module.exports = { sideSchema };