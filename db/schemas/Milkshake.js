const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const schemaOptions =  require('./settings/schemaSettings');

const milkshakeSchema = new Schema ({
  itemType: {
    type: String,
    default: 'milkshake'
  },
  type: {
    type: String,
    enum: ['vanilla', 'strawberry', 'chocolate']
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

const Milkshake = mongoose.model('Milkshake', milkshakeSchema);

module.exports = Milkshake