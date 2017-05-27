const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;


const drinkSchema = new Schema ({
  type: {
    type: String,
    enum: ['Dr. Pepper', 'Rootbeer', 'Coke', 'Pepsi', 'Mountain Dew', 'Orange Juice', 'Milk']
  },

  size: {
    type: String,
    enum: ['small', 'medium', 'large']
  }
});

const Drink = mongoose.model('Drink', drinkSchema);

module.exports = Drink