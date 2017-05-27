const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;


const burgerSchema = new Schema ({
  
//normal shit

  bunType: {
    type: String,
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
    type: Number,
    default: 0,
    trim: true
  },


  blueCheese: {
    type: Number,
    default: 0,
    trim: true
  },

  swiss: {
    type: Number,
    default: 0,
    trim: true
  },

//toppings
  bacon: {
    type: Number,
    default: 0 ,
    trim: true
  },

  sauce: {
    type: String,
  },

  pickles: {
    type: Number,
    trim: true
  },

  lettuce: {
    type: Number,
    trim: true
  },

  tomatoes: {
    type: Number,
    trim: true
  },

  onions: {
    type: Number,
    trim: true
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
  }
});


const Burger = mongoose.model('Burger', burgerSchema);
