const mongoose = require("mongoose");
const { Schema } = mongoose;
const { disciminatorOptions } = require("./settings/schemaSettings");
const {
  differenceAcrossArrays,
  findMenuItemsByItemName,
  menuItems,
  getPattyExtraPrice
} = require("./../../config/menuItems");
const { premiumToppings } = require("./../../config/toppings");
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
    premiumToppings: [
      {
        type: String,
        enum: [
          "Fried Egg",
          "Gluten Free Bun",
          "Grilled Cheese Bun",
          "Three Part Bun",
          "Chicken Patty",
          "Soy Patty",
          "Stuffed Portobello",
          "Bacon",
          "Caramelized Onions",
          "American Cheese",
          "Blue Cheese",
          "Cheese Sauce",
          "Side of Gravy",
          "Sauteed Mushrooms",
          "Blue Cheese",
          "Swiss Cheese",
          "Standard Cheese"
        ]
      }
    ],
    // ===== Standard Items ===============================================================
    standardToppings: [
      {
        type: String,
        enum: [
          "Lettuce Bun",
          "Sesame Bun",
          "Pickles",
          "Lettuce",
          "Tomatoes",
          "Onions",
          "Ketchup",
          "Mustard",
          "Mayo",
          "Relish",
          "Fancy Sauce",
          "Hot Sauce",
          "Hot Peppers"
        ]
      }
    ],
    itemCombo: {
      type: Boolean,
      default: false
    }
  },
  disciminatorOptions
);

burgerSchema.virtual("price").get(function() {
  const plusToppings = differenceAcrossArrays(this.premiumToppings)(
    findMenuItemsByItemName(this.itemName).premiumToppings
  );

  const pattyExtraPrice = getPattyExtraPrice(this.itemName, this.Patties)

  return (plusToppings
    .map(x => premiumToppings[x])
    .reduce((x, y) => x + y, findMenuItemsByItemName(this.itemName).basePrice)) + pattyExtraPrice
});

module.exports = { burgerSchema };
