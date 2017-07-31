const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const {disciminatorOptions} =  require('./settings/schemaSettings');

const sideSchema = new Schema ({
  itemType: {
    type: String,
    default: 'Sides'
  },
  itemName: {
    type: String,
    enum: ['mediumFries', 'largeFries', 'poutine', 'cheesyFries', 'smallFries'],
    default: 'medium'
  },

  itemCombo: {
    type: Boolean,
    default: false
  }



}, disciminatorOptions);

sideSchema.virtual("price").get(function() {
  if (this.itemCombo) {
    if (this.itemName === "poutine") {
      return 6.0;
    } else if (this.itemName === "cheesyFries") {
      return 4.5;
    } else if (this.itemName === "smallFries") {
      return 2.0;
    } else {
      switch (this.itemName) {
        case "mediumFries":
          return 3.99;
          break;
        case "largeFries":
          return 4.99;
          break;
        case "poutine":
          return 7.99;
          break;
        case "cheesyFries":
          return 6.49;
          break;
        default:
          return 3.99;
          break;
      }
    }
  }
});

module.exports = {sideSchema};