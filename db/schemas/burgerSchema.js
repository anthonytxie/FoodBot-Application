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

    Patties: {
      type: Number
    },

    // ===== Premium Items ===============================================================
    premiumToppings: [{
      type: String,
      enum: ['Fried Egg','Gluten Free Bun', 'Grilled Cheese Bun', 'Three Part Bun', 'Chicken Patty', 'Soy Patty', 'Stuffed Portobello', 'Bacon', 'Caramelized Onions', 'American Cheese', 'Blue Cheese', 'Cheese Sauce', 'Side of Gravy', 'Sauteed Mushrooms', 'Blue Cheese', 'Swiss Cheese', 'Standard Cheese']
    }],
    // ===== Standard Items ===============================================================
    standardToppings: [{
      type: String,
      enum: ['Lettuce Bun', 'Sesame Bun', 'Pickles', 'Lettuce', 'Tomatoes', 'Onions', 'Ketchup', 'Mustard', 'Mayo', 'Relish', 'Fancy Sauce', 'Hot Sauce', 'Hot Peppers']
    }]

  },
  disciminatorOptions
);



burgerSchema.virtual("price").get(function() {
  const burgerList = [...menuItems].filter(x => {
    return x.itemName === this.itemName;
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

  let differencePatty = this.Patties - burgerList[0].Patties;
  if (differencePatty > 0) {
    price += (differencePatty *2)
  }
  return parseFloat(price.toFixed(2))
});






module.exports = { burgerSchema };