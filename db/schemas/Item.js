const mongoose = require('mongoose');
const { Schema } = mongoose;
const { burgerSchema } = require('./../schemas/burgerSchema');
const { drinkSchema } = require('./../schemas/drinkSchema');
const { sideSchema } = require('./../schemas/sideSchema');
const { itemSchema } = require('./../schemas/itemSchema');
const { disciminatorOptions } = require('./../schemas/settings/schemaSettings');
const Order = require('./../models/Order');





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