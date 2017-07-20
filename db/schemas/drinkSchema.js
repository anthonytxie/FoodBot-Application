const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const {disciminatorOptions} =  require('./settings/schemaSettings');

const drinkSchema = new Schema ({

  itemType: {
    type: String,
    default: 'drink'
  },
  type: {
    type: String,
    enum: ['Dr. Pepper', 'Rootbeer', 'Coke', 'Pepsi', 'Mountain Dew', 'Orange Juice', 'Milk', 'Milkshake']
  },

  size: {
    type: String,
    enum: ['small', 'medium', 'large']
  },
  
},disciminatorOptions);


module.exports = { drinkSchema };