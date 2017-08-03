const mongoose = require('mongoose');
const { burgerSchema } = require('./../schemas/burgerSchema');
const { drinkSchema } = require('./../schemas/drinkSchema');
const { sideSchema } = require('./../schemas/sideSchema');
const { itemSchema } = require('./../schemas/itemSchema');
const { disciminatorOptions } =  require('../schemas/settings/schemaSettings');

// Models that are All Items

var Item = mongoose.model('Item', itemSchema);

var Burger = Item.discriminator('Burger',
  burgerSchema, disciminatorOptions);

var Drink = Item.discriminator('Drink',
  drinkSchema, disciminatorOptions);

var Side = Item.discriminator('Sides',
  sideSchema, disciminatorOptions);

module.exports = {Item, Burger, Drink, Side};