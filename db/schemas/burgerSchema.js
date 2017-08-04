const mongoose = require("mongoose");
const { Schema } = mongoose;
const { disciminatorOptions } = require("./settings/schemaSettings");
const { menuItems } = require("./../../messenger-api-helpers/messages/menuItems");
const { premiumToppings } = require("./../../messenger-api-helpers/messages/toppings");



const burgerSchema = new Schema(
  {
    // ===== Type ===============================================================
    itemName: {
      type: String
    },

    itemType: {
      type: String,
      default: "burger"
    },

    patties: {
      type: Number
    },

    // ===== Premium Items ===============================================================
    premiumToppings: [{
      type: String,
      enum: ['friedEgg','glutenFreeBun', 'grilledCheeseBun', 'threePartBun', 'chickenPatty', 'soyPatty', 'stuffedPortobello', 'bacon', 'caramelizedOnions', 'americanCheese', 'blueCheese', 'cheeseSauce', 'gravySide', 'sauteedMushrooms', 'blueCheese', 'swissCheese', 'standardCheese']
    }],
    // ===== Standard Items ===============================================================
    standardToppings: [{
      type: String,
      enum: ['lettuceBun', 'standardBun', 'pickles', 'lettuce', 'tomatoes', 'onions', 'ketchup', 'mustard', 'mayo', 'relish', 'fancySauce', 'hotSauce', 'tomato', 'pickle', 'hotPepper']
    }]  

  },
  disciminatorOptions
);



burgerSchema.virtual("price").get(function() {
  const burgerList = [...menuItems].filter(x => {
    return x.title === this.itemName;
  });
  const standardBurgerPremiumToppings = burgerList[0].premiumToppings.sort();
  const customizedBurgerPremiumToppings = this.premiumToppings.sort();
  const additionalPremiumToppings = customizedBurgerPremiumToppings.filter((x) => {
    return standardBurgerPremiumToppings.indexOf(x) === -1
  })
  let price = burgerList[0].basePrice
  additionalPremiumToppings.forEach((x) => {
    price += premiumToppings[x]
  })
  return parseFloat(price.toFixed(2))
});



module.exports = { burgerSchema };