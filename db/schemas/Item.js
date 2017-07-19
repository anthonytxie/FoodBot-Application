const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const schemaOptions =  require('./settings/schemaSettings');


var options = {discriminatorKey: 'kind'};

var itemSchema = new mongoose.Schema({time: Date}, options);
var Item = mongoose.model('Item', itemSchema);

// ClickedLinkEvent is a special type of Event that has
// a URL.
var Burger = Item.discriminator('Burger',
  new mongoose.Schema({type: String}, options));

var Drink = Item.discriminator('Drink',
  new mongoose.Schema({type: String}, options));


var Side = Item.discriminator('Sides',
  new mongoose.Schema({type: String}, options));


module.exports = {Item, Burger, Drink, Side}