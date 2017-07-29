const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const { disciminatorOptions } = require("./settings/schemaSettings");
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
      enum: ['glutenFreeBun', 'grilledCheeseBun', 'threePartBun', 'chickenPatty', 'soyPatty', 'stuffedPortobello', 'bacon', 'caramelizedOnions', 'americanCheese', 'blueCheese', 'cheeseSauce', 'gravySide', 'sauteedMushrooms', 'blueCheese', 'swissCheese', 'standardCheese']
    }],
    // ===== Standard Items ===============================================================
    standardToppings: [{
      type: String,
      enum: ['lettuceBun', 'standardBun', 'pickles', 'lettuce', 'tomatoes', 'onions', 'friedEgg', 'ketchup', 'mustard', 'mayo', 'relish', 'fancySauce', 'hotSauce', 'tomato', 'pickle', 'onion', 'hotPepper']
    }]  

  },
  disciminatorOptions
);








// burgerSchema.virtual("price").get(function() {
//   switch (this.itemName) {
//     case "Top Bun":
//       return 9.99 + (1.5 * this.glutenFreeBun) + (2.99 * this.grilledCheeseBun) + (5.95 * this.stuffedPortobello) + (1.5 * this.bacon) + (4.99 * this.chickenPatty) + (1 * this.caramelizedOnions) + (1 * this.americanCheese) + (1.5 * this.blueCheese) + (2.5 * this.cheeseSauce) + (1.5 * this.gravySide) + (1.5 * this.sauteedMushrooms) + ((this.patties - 2) * 2);
//       break;
//     case "The Richmond":
//       return 9.99 + (1.5 * this.glutenFreeBun) + (2.99 * this.grilledCheeseBun) + (5.95 * this.stuffedPortobello) + (4.99 * this.chickenPatty) + (1 * this.americanCheese) + (1.5 * this.blueCheese) + (2.5 * this.cheeseSauce) + (1.5 * this.gravySide) + (1.5 * this.sauteedMushrooms) + ((this.patties - 2) * 2)
//       break;
//     case "Breakfast At Tiffany's":
//       return 10.99 +(1.95 * this.glutenFreeBun) 
//       break;
//     case "Varsity Blues":
//       return 9.99 
//       break;
//     case "Say Cheese":
//       return 10.99 
//       break;

//     case "The Portobello":
//       return 7.99 
//       break;

//     case "Chicken Chicken":
//       return 9.99 
//       break;

//     case "Swiss Bank Account":
//       return 9.99 
//       break;
//     case "Double Hamburger (No Cheese)":
//       break;

//     case "Double Cheeseburger":
//       break;

//     case "Double Baconburger (No Cheese)":
//       break;

//     case "Double Bacon Cheeseburger":
//       break;

//     case "Chicken Burger":
//       break;

//     case "Veggie Burger":
//       break;

//     default:
//       break;
//   }
// });

module.exports = { burgerSchema };