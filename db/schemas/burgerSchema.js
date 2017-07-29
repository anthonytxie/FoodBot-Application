const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const { disciminatorOptions } = require("./settings/schemaSettings");
const { normalBurgers, specialBurgers } = require("./../../messenger-api-helpers/messages/burgers")
const { toppings } = require("./../../messenger-api-helpers/messages/toppings")



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
  const burgerObject = [...normalBurgers,...specialBurgers].filter( function(x) {
    return x.title == this.itemName
  })

  const 
  

});




module.exports = { burgerSchema };