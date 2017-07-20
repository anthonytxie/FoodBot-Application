const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const { burgerSchema } = require('./burgerSchema');
const { drinkSchema } = require('./drinkSchema');
const { sideSchema } = require('./sideSchema')
const { disciminatorOptions } = require('./settings/schemaSettings');

var itemSchema = new mongoose.Schema({time: Date}, disciminatorOptions);
var Item = mongoose.model('Item', itemSchema);

// ClickedLinkEvent is a special type of Event that has
// a URL.
var Burger = Item.discriminator('Burger',
  burgerSchema, disciminatorOptions);

var Drink = Item.discriminator('Drink',
  drinkSchema, disciminatorOptions);

var Side = Item.discriminator('Sides',
  sideSchema, disciminatorOptions);


module.exports = {Item, Burger, Drink, Side}