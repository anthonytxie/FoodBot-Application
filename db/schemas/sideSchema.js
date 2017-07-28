const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const {disciminatorOptions} =  require('./settings/schemaSettings');

const sideSchema = new Schema ({
  itemType: {
    type: String,
    default: 'fries'
  },
  size: {
    type: String,
    enum: ['small', 'medium', 'large'],
    default: 'medium'
  },

}, disciminatorOptions);


module.exports = {sideSchema};