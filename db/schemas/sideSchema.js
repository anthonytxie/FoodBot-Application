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
    enum: ['Medium Fries', 'Large Fries', 'Poutine', 'Cheesy Fries'],
    default: 'medium'
  },

}, disciminatorOptions);


sideSchema.virtual("price").get(function() {
  let price;
  switch (this.itemName) {
    case "Medium Fries":
      return 3.99;
      break;
    case "Large Fries":
      return 4.99;
      break;
    case "Poutine":
      return 7.99;
      break;
    case "Cheesy Fries":
      return 6.49;
      break;
    default:
      return 3.99;
      break;
  }
});

module.exports = {sideSchema};