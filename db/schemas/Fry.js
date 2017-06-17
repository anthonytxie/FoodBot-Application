const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const schemaOptions =  require('./settings/schemaSettings');

const frySchema = new Schema ({
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