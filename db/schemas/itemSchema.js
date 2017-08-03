const mongoose = require('mongoose');
const { Schema } = mongoose;
const {disciminatorOptions} =  require('./settings/schemaSettings');
const itemSchema = new mongoose.Schema({
  createdDate: {
    type: Date,
    default: Date.now
  },
  _order: {
    type: Schema.ObjectId,
    ref: 'Order'
  },
},disciminatorOptions);




module.exports = {itemSchema};