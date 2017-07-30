const normalBurgers = [
	{
		title: "Single Hamburger (No Cheese)",
		image_url: "http://i.imgur.com/6PnW8EE.jpg",
		subtitle: "One beef patty, on a sesame bun.",
		burgerObject: {
			title: "Single Hamburger (No Cheese)",
			patties: 1,
			standardToppings: ["standardBun"],
			premiumToppings: [],
			basePrice:  5.99
		}
	},
	{
		title: "Single Cheeseburger",
		image_url: "http://i.imgur.com/6PnW8EE.jpg",
		subtitle: "One beef patty with cheese, on a sesame bun.",
		burgerObject: {
			title: "Single Cheeseburger",
			patties: 1,
			standardToppings: ["standardBun"],
			premiumToppings: ['standardCheese'],
			basePrice:  6.99
		}
	},

	{
		title: "Single Baconburger",
		image_url: "http://i.imgur.com/6PnW8EE.jpg",
		subtitle: "One beef patty with bacon, on a sesame bun.",
		burgerObject: {
			title: "Single Baconburger",
			patties: 1,
			standardToppings: ["standardBun"],
			premiumToppings: ['bacon'],
			basePrice:  7.49
		}
	},

	{
		title: "Single Bacon Cheeseburger",
		image_url: "http://i.imgur.com/6PnW8EE.jpg",
		subtitle: "One beef patty with cheese and bacon, on a sesame bun.",
		burgerObject: {
			title: "Single Cheese Baconburger",
			patties: 1,
			standardToppings: ["standardBun"],
			premiumToppings: ['standardCheese', 'bacon'],
			basePrice:  8.49
		}
	},

	{
		title: "Double Hamburger (No Cheese)",
		image_url: "http://i.imgur.com/6PnW8EE.jpg",
		subtitle: "Two beef patties, on a sesame bun.",
		burgerObject: {
			title: "Double Hamburger (No Cheese)",
			patties: 2,
			standardToppings: ["standardBun"],
			premiumToppings: [],
			basePrice:  7.99
		}
	},

	{
		title: "Double Cheeseburger",
		image_url: "http://i.imgur.com/z7ANC0C.jpg",
		subtitle: "Double cheese burger with caramelized onions.",
		burgerObject: {
			title: "Double Cheeseburger",

			patties: 2,
			standardToppings: ["standardBun"],
			premiumToppings: ["standardCheese"],
			basePrice: 8.99
		}
	},

	{
		title: "Double Baconburger (No Cheese)",
		image_url: "http://i.imgur.com/aUB3Mrd.jpg",
		subtitle: "Two patties with bacon on a burger.",
		burgerObject: {
			title: "Double Baconburger (No Cheese)",

			patties: 2,
			standardToppings: ["standardBun"],
			premiumToppings: ["bacon"],
			basePrice: 9.49
		}
	},

	{
		title: "Double Bacon Cheeseburger",
		image_url: "http://i.imgur.com/wySPVNs.jpg",
		subtitle: "Two patties with bacon & cheese.",
		burgerObject: {
			title: "Double Bacon Cheeseburger",

			patties: 2,
			standardToppings: ["standardBun"],
			premiumToppings: ["bacon", "standardCheese"],
			basePrice: 9.49
		}
	},

	{
		title: "Chicken Burger",
		image_url: "http://i.imgur.com/6PnW8EE.jpg",
		subtitle: "Chicken burger with mayo.",
		burgerObject: {
			title: "Chicken Burger",

			premiumToppings: ["chickenPatty"],
			standardToppings: ["lettuce", "pickles", "standardBun", "mayo"],
			basePrice: 9.99
		}
	},

	{
		title: "Veggie Burger",
		image_url: "http://i.imgur.com/z7ANC0C.jpg",
		subtitle: "Veggie burger with soy pattie.",
		burgerObject: {
			title: "Veggie Burger",

			premiumToppings: ["soyPatty"],
			standardToppings: ["standardBun"]
		}
	}
];

const specialBurgers = [
	{
		title: "Top Bun",
		image_url: "http://i.imgur.com/6PnW8EE.jpg",
		subtitle:
			"Two beef patties, fancy sauce, cheese, pickles, chopped lettuce, diced onion, served on a three part bun.",
		burgerObject: {
			title: "Top Bun",

			premiumToppings: ["threePartBun", "standardCheese"],
			standardToppings: ["fancySauce", "pickles", "lettuce", "onions"],
			basePrice: 9.99
		}
	},
	{
		title: "The Richmond",
		image_url: "http://i.imgur.com/z7ANC0C.jpg",
		subtitle: "Double cheese burger with bacon & caramelized onions.",
		burgerObject: {
			title: "The Richmond",

			patties: 2,
			standardToppings: ["standardBun", "fancySauce"],
			premiumToppings: ["standardCheese", "caramelizedOnions", "bacon"],
			basePrice: 9.99
		}
	},

	{
		title: "Breakfast At Tiffany's",
		image_url: "http://i.imgur.com/aUB3Mrd.jpg",
		subtitle:
			"Double cheese burger with bacon, caramelized onions & a friend egg.",
		burgerObject: {
			title: "Breakfast At Tiffany's",

			patties: 2,
			premiumToppings: ["friedEgg", "bacon", "standardCheese"],
			standardToppings: ["onions", "standardBun"],
			basePrice: 10.99
		}
	},

	{
		title: "Varsity Blues",
		image_url: "http://i.imgur.com/wySPVNs.jpg",
		subtitle: "Two beef patties, bacon, & blue cheese.",
		burgerObject: {
			title: "Varsity Blues",

			patties: 2,
			premiumToppings: ["blueCheese", "caramelizedOnions", "bacon"],
			standardToppings: ["standardBun"],
			basePrice: 9.99
		}
	},

	{
		title: "Say Cheese",
		image_url: "http://i.imgur.com/Jq4kO7S.jpg",
		subtitle: "Double cheeseburger, stuffed between two grilled cheese buns.",
		burgerObject: {
			title: "Say Cheese",
			patties: 2,
			standardToppings: [],
			premiumToppings: ["grilledCheeseBun", "standardCheese"],
			basePrice: 10.99
		}
	},

	{
		title: "The Portobello",
		image_url: "http://i.imgur.com/m4IQMAD.jpg",
		subtitle:
			"A Portobello stuffed with herbed cheese, rolled in panko crumbs & fried.",
		burgerObject: {
			title: "The Portobello",

			premiumToppings: ["stuffedPortobello"],
			standardToppings: ["standardBun"],
			basePrice: 7.99
		}
	},

	{
		title: "Chicken Chicken",
		image_url: "http://i.imgur.com/m4IQMAD.jpg",
		subtitle: "Breaded chicken breast mayo, chopped lettuce and pickles.",
		burgerObject: {
			title: "Chicken Chicken",
			premiumToppings: ["chickenPatty"],
			standardToppings: ["lettuce", "pickles", "standardBun", "mayo"],
			basePrice: 9.99
		}
	},
	{
		title: "Swiss Bank Account",
		image_url: "http://i.imgur.com/m4IQMAD.jpg",
		subtitle: "Two beef patties, grilled mushrooms and swiss cheese.",
		burgerObject: {
			title: "Swiss Bank Account",

			patties: 2,
			premiumToppings: ["swissCheese", "sauteedMushrooms"],
			standardToppings: ["standardBun"],
			basePrice: 9.99
		}
	}
];

const findBurger = function(name) {
  return [...normalBurgers, ...specialBurgers]
    .filter(x => {
      return x.title === name;
    })
    .pop();
};
module.exports = { normalBurgers, specialBurgers, findBurger };