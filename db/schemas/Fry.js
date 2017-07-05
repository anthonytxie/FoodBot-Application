const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const schemaOptions =  require('./settings/schemaSettings');

const frySchema = new Schema ({
  itemType: {
    type: String,
    default: 'fry'
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

const Fry = mongoose.model('Fry', frySchema);

module.exports = Fry