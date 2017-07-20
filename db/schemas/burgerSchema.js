const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const {disciminatorOptions} =  require('./settings/schemaSettings');
const burgerSchema = new Schema({
  
//normal shit
  itemType: {
    type: String,
    default: 'burger'
  },


  bunType: {
    type: String,
    enum: ['white', 'rye', 'whole-wheat']
  },

  meatType: {
    type: String,
  },

  patties: {
    type: Number,
    default: 1,
    required: true,
    trim: true
  },

//cheeses
  cheddar: {
    type: Boolean,
    default: false,
  },


  blueCheese: {
    type: Boolean,
    default: false,
  },

  swiss: {
    type: Boolean,
    default: false,
  },

//toppings
  bacon: {
    type: Boolean,
    default: false ,
  },

  sauce: {
    type: String,
  },

  pickles: {
    type: Boolean,
    default: true,
  },

  lettuce: {
    type: Boolean,
    default: true
  },

  tomatoes: {
    type: Boolean,
    default: true
  },

  onions: {
    type: Boolean,
    default: true
  },

//special toppings
  fried: {
    type: Boolean,
    default: false
  },

  pankoCrumbs: {
    type: Boolean,
    default: false
  },

  egg: {
    type: Boolean,
    default: false,
  },
}, disciminatorOptions);


burgerSchema.virtual('price').get(function() {
  return (4 + (this.patties * 2) + (this.cheddar * 1) + (this.swiss * 1) + (this.blueCheese * 1));
});

module.exports = {burgerSchema};