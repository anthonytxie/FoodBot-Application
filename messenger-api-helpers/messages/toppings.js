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

const burgerObject = function(burgerObject) {
  const burgerList = [...normalBurgers, ...specialBurgers].filter(x => {
    return x.title == burgerObject.title;
  });
  const standardBurgerPremiumToppings = burgerList[0].burgerObject.premiumToppings.sort();
  const customizedBurgerPremiumToppings = burgerObject.burgerObject.premiumToppings.sort();
  const additionalPremiumToppings = customizedBurgerPremiumToppings.filter((x) => {
    return standardBurgerPremiumToppings.indexOf(x) === -1
  })
  return additionalPremiumToppings


  // let price = burgerList[0].burgerObject.basePrice
  // standardBurgerPremiumToppings.forEach((x) => {
  //   console.log(x)
  //   price += premiumToppings[x]
  // })
  // return price
};

var finalPrice = burgerObject({ title: 'The Richmond',
  image_url: 'http://i.imgur.com/z7ANC0C.jpg',
  subtitle: 'Double cheese burger with bacon & caramelized onions.',
  burgerObject: 
   { title: 'The Richmond',
     patties: 2,
     standardToppings: [ 'standardBun', 'fancySauce' ],
     premiumToppings: [ 'standardCheese', 'caramelizedOnions', 'bacon', 'gravySide', 'cheeseSauce' ],
     basePrice: 9.99 } })

console.log(finalPrice)

module.exports = { premiumToppings };