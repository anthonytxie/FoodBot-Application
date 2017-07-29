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
    enum: ['Medium Fries', 'Large Fries', 'Poutine', 'Cheesy Fries', 'Small Fries'],
    default: 'medium'
  },

  itemCombo: {
    type: Boolean,
    default: false
  }



}, disciminatorOptions);

// sideSchema.virtual("price").get(function() {
//   if (this.itemCombo) {
//     if (this.itemName === "Poutine") {
//       return 6.0;
//     } else if (this.itemName === "Cheesy Fires") {
//       return 4.5;
//     } else if (this.itemName === "Small Fries") {
//       return 2.0;
//     } else {
//       switch (this.itemName) {
//         case "Medium Fries":
//           return 3.99;
//           break;
//         case "Large Fries":
//           return 4.99;
//           break;
//         case "Poutine":
//           return 7.99;
//           break;
//         case "Cheesy Fries":
//           return 6.49;
//           break;
//         default:
//           return 3.99;
//           break;
//       }
//     }
//   }
// });

module.exports = {sideSchema};