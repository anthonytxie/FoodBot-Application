const menuItems = [
	{
		title: "Single Hamburger",
		type: "burger",
		// image_url: "https://i.imgur.com/6PnW8EE.jpg",
		subtitle: "One beef patty, on a sesame bun.",
		patties: 1,
		standardToppings: ["standardBun"],
		premiumToppings: [],
		basePrice: 5.99
	},
	{
		title: "Single Cheeseburger",
		type: "burger",

		// image_url: "https://i.imgur.com/6PnW8EE.jpg",
		subtitle: "One beef patty with cheese, on a sesame bun.",
		patties: 1,
		standardToppings: ["standardBun"],
		premiumToppings: ["standardCheese"],
		basePrice: 6.99
	},

	{
		title: "Single Baconburger",
		type: "burger",

		// image_url: "https://i.imgur.com/6PnW8EE.jpg",
		subtitle: "One beef patty with bacon, on a sesame bun.",
		patties: 1,
		standardToppings: ["standardBun"],
		premiumToppings: ["bacon"],
		basePrice: 7.49
	},

	{
		title: "Single Bacon Cheeseburger",
		type: "burger",

		// image_url: "https://i.imgur.com/6PnW8EE.jpg",
		subtitle: "One beef patty with cheese and bacon, on a sesame bun.",
		patties: 1,
		standardToppings: ["standardBun"],
		premiumToppings: ["standardCheese", "bacon"],
		basePrice: 8.49
	},

	{
		title: "Double Hamburger (No Cheese)",
		type: "burger",

		// image_url: "https://i.imgur.com/6PnW8EE.jpg",
		subtitle: "Two beef patties, on a sesame bun.",
		patties: 2,
		standardToppings: ["standardBun"],
		premiumToppings: [],
		basePrice: 7.99
	},

	{
		title: "Double Cheeseburger",
		type: "burger",

		// image_url: "https://i.imgur.com/z7ANC0C.jpg",
		subtitle: "Double cheese burger with caramelized onions.",

		patties: 2,
		standardToppings: ["standardBun"],
		premiumToppings: ["standardCheese"],
		basePrice: 8.99
	},

	{
		title: "Double Baconburger (No Cheese)",
		type: "burger",

		// image_url: "https://i.imgur.com/aUB3Mrd.jpg",
		subtitle: "Two patties with bacon on a burger.",

		patties: 2,
		standardToppings: ["standardBun"],
		premiumToppings: ["bacon"],
		basePrice: 9.49
	},

	{
		title: "Double Bacon Cheeseburger",
		type: "burger",

		// image_url: "https://i.imgur.com/wySPVNs.jpg",
		subtitle: "Two patties with bacon & cheese.",

		patties: 2,
		standardToppings: ["standardBun"],
		premiumToppings: ["bacon", "standardCheese"],
		basePrice: 9.49
	},

	{
		title: "Chicken Burger",
		type: "burger",

		// image_url: "https://i.imgur.com/6PnW8EE.jpg",
		subtitle: "Chicken burger with mayo.",
		patties: 1,
		premiumToppings: ["chickenPatty"],
		standardToppings: ["lettuce", "pickles", "standardBun", "mayo"],
		basePrice: 9.99
	},

	{
		title: "Veggie Burger",
		type: "burger",

		image_url: "https://i.imgur.com/z7ANC0C.jpg",
		subtitle: "Veggie burger with soy pattie.",
		premiumToppings: ["soyPatty"],
		standardToppings: ["standardBun"],
		basePrice: 7.99
	},

	{
		title: "Top Bun",
		type: "burger",

		image_url: "https://i.imgur.com/6PnW8EE.jpg",
		subtitle:
			"Two beef patties, fancy sauce, cheese, pickles, chopped lettuce, diced onion, served on a three part bun.",
		patties: 2,
		premiumToppings: ["threePartBun", "standardCheese"],
		standardToppings: ["fancySauce", "pickles", "lettuce", "onions"],
		basePrice: 9.99
	},
	{
		title: "The Richmond",
		type: "burger",

		image_url: "https://i.imgur.com/z7ANC0C.jpg",
		subtitle: "Double cheese burger with bacon & caramelized onions.",

		patties: 2,
		standardToppings: ["standardBun", "fancySauce"],
		premiumToppings: ["standardCheese", "caramelizedOnions", "bacon"],
		basePrice: 9.99
	},

	{
		title: "Breakfast At Tiffany's",
		type: "burger",

		image_url: "https://i.imgur.com/aUB3Mrd.jpg",
		subtitle:
			"Double cheese burger with bacon, caramelized onions & a friend egg.",

		patties: 2,
		premiumToppings: ["friedEgg", "bacon", "standardCheese"],
		standardToppings: ["onions", "standardBun"],
		basePrice: 10.99
	},

	{
		title: "Varsity Blues",
		type: "burger",

		image_url: "https://i.imgur.com/wySPVNs.jpg",
		subtitle: "Two beef patties, bacon, & blue cheese.",

		patties: 2,
		premiumToppings: ["blueCheese", "caramelizedOnions", "bacon"],
		standardToppings: ["standardBun"],
		basePrice: 9.99
	},

	{
		title: "Say Cheese",
		type: "burger",

		image_url: "https://i.imgur.com/Jq4kO7S.jpg",
		subtitle: "Double cheeseburger, stuffed between two grilled cheese buns.",
		patties: 2,
		standardToppings: [],
		premiumToppings: ["grilledCheeseBun", "standardCheese"],
		basePrice: 10.99
	},

	{
		title: "The Portobello",
		type: "burger",

		image_url: "https://i.imgur.com/m4IQMAD.jpg",
		subtitle:
			"A Portobello stuffed with herbed cheese, rolled in panko crumbs & fried.",

		premiumToppings: ["stuffedPortobello"],
		standardToppings: ["standardBun"],
		basePrice: 7.99
	},

	{
		title: "Chicken Chicken",
		type: "burger",

		image_url: "https://i.imgur.com/ZF0uYiN.jpg",
		subtitle: "Breaded chicken breast mayo, chopped lettuce and pickles.",
		patties: 1,
		premiumToppings: ["chickenPatty"],
		standardToppings: ["lettuce", "pickles", "standardBun", "mayo"],
		basePrice: 9.99
	},
	{
		title: "Swiss Bank Account",
		type: "burger",

		image_url: "https://i.imgur.com/cBeuQqB.jpg",
		subtitle: "Two beef patties, grilled mushrooms and swiss cheese.",

		patties: 2,
		premiumToppings: ["swissCheese", "sauteedMushrooms"],
		standardToppings: ["standardBun"],
		basePrice: 9.99
	},
	{
		title: "Fries",
		type: "side",

		image_url: "https://i.imgur.com/6PnW8EE.jpg",
		subtitle: "Perfectly cut, golden cripsy, potato fries.",
		itemName: "fries"

	},
	{
		title: "Poutine",
		type: "side",
		image_url: "https://i.imgur.com/6PnW8EE.jpg",
		subtitle: "Poutine, the Canadian way.",
		itemName: "poutine"

	},

	{
		title: "Cheesy Fries",
		type: "side",
		image_url: "https://i.imgur.com/6PnW8EE.jpg",
		subtitle: "Cheesy fries.",
		itemName: "cheesyFries"
	},

	{
		title: "Milkshake",
		type: "side",
		image_url: "https://i.imgur.com/6PnW8EE.jpg",
		subtitle: "Delicious ice-cream milkshake",
		itemName: "milkshake"
	}
];

const findItem = function(name) {
	return [...menuItems]
		.filter(x => {
			return x.title === name;
		})
		.pop();
};

module.exports = { menuItems, findItem };