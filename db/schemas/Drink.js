const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const schemaOptions =  require('./settings/schemaSettings');

const drinkSchema = new Schema ({

  itemType: {
    type: String,
    default: 'drink'
  },
  type: {
    type: String,
    enum: ['Dr. Pepper', 'Rootbeer', 'Coke', 'Pepsi', 'Mountain Dew', 'Orange Juice', 'Milk']
  },

  size: {
    type: String,
    enum: ['small', 'medium', 'large']
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }

});

const Drink = mongoose.model('Drink', drinkSchema);

module.exports = Drink