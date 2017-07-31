const { normalBurgers, specialBurgers } = require("./burgers");

const premiumToppings = {
  glutenFreeBun: 1.5,
  grilledCheeseBun: 2.99,
  stuffedPortobello: 5.95,
  patties: 2,
  bacon: 1.5,
  chickenPatty: 4.99,
  caramelizedOnions: 1,
  americanCheese: 1,
  blueCheese: 1.5,
  cheeseSauce: 2.5,
  gravySide: 1.5,
  sauteedMushroom: 1.,
  friedEgg: 0,
  standardCheese: 0
};

const premiumToppingsArray = ['friedEgg','glutenFreeBun', 'grilledCheeseBun', 'threePartBun', 'chickenPatty', 'soyPatty', 'stuffedPortobello', 'bacon', 'caramelizedOnions', 'americanCheese', 'blueCheese', 'cheeseSauce', 'gravySide', 'sauteedMushrooms', 'blueCheese', 'swissCheese', 'standardCheese'];


module.exports = { premiumToppings, premiumToppingsArray };