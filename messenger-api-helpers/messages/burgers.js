const normalBurgers = [
	{
		title: "Double Hamburger (No Cheese)",
		image_url: "http://i.imgur.com/6PnW8EE.jpg",
		subtitle: "Two beef patties, on a sesame bun.",
		burgerObject: {
			patties: 2,
			standardToppings: ["standardBun"]
		}
	},

	{
		title: "Double Cheeseburger",
		image_url: "http://i.imgur.com/z7ANC0C.jpg",
		subtitle: "Double cheese burger with caramelized onions.",
		burgerObject: {
			patties: 2,
			standardToppings: ["standardBun"],
			premiumToppings: ["standardCheese"]
		}
	},

	{
		title: "Double Baconburger (No Cheese)",
		image_url: "http://i.imgur.com/aUB3Mrd.jpg",
		subtitle: "Two patties with bacon on a burger.",
		burgerObject: {
			patties: 2,
			standardToppings: ["standardBun"],
			premiumToppings: ["bacon"]
		}
	},

	{
		title: "Double Bacon Cheeseburger",
		image_url: "http://i.imgur.com/wySPVNs.jpg",
		subtitle: "Two patties with bacon & cheese.",
		burgerObject: {
			patties: 2,
			standardToppings: ["standardBun"],
			premiumToppings: ["bacon", "standardCheese"]
		}
	},

	{
		title: "Chicken Burger",
		image_url: "http://i.imgur.com/6PnW8EE.jpg",
		subtitle: "Chicken burger with mayo.",
		burgerObject: {
			premiumToppings: ["chickenPatty"],
			standardToppings: ["lettuce", "pickles", "standardBun", "mayo"]
		}
	},

	{
		title: "Veggie Burger",
		image_url: "http://i.imgur.com/z7ANC0C.jpg",
		subtitle: "Veggie burger with soy pattie.",
		burgerObject: {
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
			premiumToppings: ["threePartBun", "standardCheese"],
			standardToppings: ["fancySauce", "pickles", "lettuce", "onions"]
		}
	},
	{
		title: "The Richmond",
		image_url: "http://i.imgur.com/z7ANC0C.jpg",
		subtitle: "Double cheese burger with bacon & caramelized onions.",
		burgerObject: {
			patties: 2,
			standardToppings: ["standardBun", "fancySauce"],
			premiumToppings: ["standardCheese", "caramelizedOnions", "bacon"]
		}
	},

	{
		title: "Breakfast At Tiffany's",
		image_url: "http://i.imgur.com/aUB3Mrd.jpg",
		subtitle:
			"Double cheese burger with bacon, caramelized onions & a friend egg.",
		burgerObject: {
			patties: 2,
			premiumToppings: ["friedEgg", "bacon", "standardCheese"],
			standardToppings: ["onions", "standardBun"]
		}
	},

	{
		title: "Varsity Blues",
		image_url: "http://i.imgur.com/wySPVNs.jpg",
		subtitle: "Two beef patties, bacon, & blue cheese.",
		burgerObject: {
			patties: 2,
			premiumToppings: ["blueCheese", "caramelizedOnions", "bacon"],
			standardToppings: ["standardBun"]
		}
	},

	{
		title: "Say Cheese",
		image_url: "http://i.imgur.com/Jq4kO7S.jpg",
		subtitle: "Double cheeseburger, stuffed between two grilled cheese buns.",
		burgerObject: {
			patties: 2,
			premiumToppings: ["grilledCheeseBun", "standardCheese"]
		}
	},

	{
		title: "The Portobello",
		image_url: "http://i.imgur.com/m4IQMAD.jpg",
		subtitle:
			"A Portobello stuffed with herbed cheese, rolled in panko crumbs & fried.",
		burgerObject: {
			premiumToppings: ["stuffedPortobello"],
			standardToppings: ["standardBun"]
		}
	},

	{
		title: "Chicken Chicken",
		image_url: "http://i.imgur.com/m4IQMAD.jpg",
		subtitle: "Breaded chicken breast mayo, chopped lettuce and pickles.",
		burgerObject: {
			premiumToppings: ["chickenPatty"],
			standardToppings: ["lettuce", "pickles", "standardBun", "mayo"]
		}
	},
	{
		title: "Swiss Bank Account",
		image_url: "http://i.imgur.com/m4IQMAD.jpg",
		subtitle: "Two beef patties, grilled mushrooms and swiss cheese.",
		burgerObject: {
			patties: 2,
			premiumToppings: ["swissCheese", "sauteedMushrooms"],
			standardToppings: ["standardBun"]
		}
	}
];

module.exports = { normalBurgers, specialBurgers };
