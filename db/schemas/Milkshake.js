const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const schemaOptions =  require('./settings/schemasettings');

const milkshakeSchema = new Schema ({
  type: {
    type: String,
    enum: ['vanilla', 'strawberry', 'chocolate']
  },

  size: {
    type: String,
    enum: ['small', 'medium', 'large']
  }
});

const Milkshake = mongoose.model('Milkshake', milkshakeSchema);

module.exports = Milkshake