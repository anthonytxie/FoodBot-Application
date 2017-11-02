const menuItems = [
	{
		title: "Single Hamburger",
		type: "burger",
		// image_url: "https://i.imgur.com/6PnW8EE.jpg",
		subtitle: "One beef patty, on a sesame bun.",
		Patties: 1,
		standardToppings: ["Standard Bun"],
		premiumToppings: [],
		basePrice: 5.99
	},
	{
		title: "Single Cheeseburger",
		type: "burger",

		// image_url: "https://i.imgur.com/6PnW8EE.jpg",
		subtitle: "One beef patty with cheese, on a sesame bun.",
		Patties: 1,
		standardToppings: ["Standard Bun"],
		premiumToppings: ["Standard Cheese"],
		basePrice: 6.99
	},

	{
		title: "Single Baconburger",
		type: "burger",

		// image_url: "https://i.imgur.com/6PnW8EE.jpg",
		subtitle: "One beef patty with Bacon, on a sesame bun.",
		Patties: 1,
		standardToppings: ["Standard Bun"],
		premiumToppings: ["Bacon"],
		basePrice: 7.49
	},

	{
		title: "Single Bacon Cheeseburger",
		type: "burger",

		// image_url: "https://i.imgur.com/6PnW8EE.jpg",
		subtitle: "One beef patty with cheese and Bacon, on a sesame bun.",
		Patties: 1,
		standardToppings: ["Standard Bun"],
		premiumToppings: ["Standard Cheese", "Bacon"],
		basePrice: 8.49
	},

	{
		title: "Double Hamburger (No Cheese)",
		type: "burger",

		// image_url: "https://i.imgur.com/6PnW8EE.jpg",
		subtitle: "Two beef Patties, on a sesame bun.",
		Patties: 2,
		standardToppings: ["Standard Bun"],
		premiumToppings: [],
		basePrice: 7.99
	},

	{
		title: "Double Cheeseburger",
		type: "burger",

		// image_url: "https://i.imgur.com/z7ANC0C.jpg",
		subtitle: "Double cheese burger with caramelized Onions.",

		Patties: 2,
		standardToppings: ["Standard Bun"],
		premiumToppings: ["Standard Cheese"],
		basePrice: 8.99
	},

	{
		title: "Double Baconburger (No Cheese)",
		type: "burger",

		// image_url: "https://i.imgur.com/aUB3Mrd.jpg",
		subtitle: "Two Patties with Bacon on a burger.",

		Patties: 2,
		standardToppings: ["Standard Bun"],
		premiumToppings: ["Bacon"],
		basePrice: 9.49
	},

	{
		title: "Double Bacon Cheeseburger",
		type: "burger",

		// image_url: "https://i.imgur.com/wySPVNs.jpg",
		subtitle: "Two Patties with Bacon & cheese.",

		Patties: 2,
		standardToppings: ["Standard Bun"],
		premiumToppings: ["Bacon", "Standard Cheese"],
		basePrice: 9.49
	},

	{
		title: "Chicken Burger",
		type: "burger",

		// image_url: "https://i.imgur.com/6PnW8EE.jpg",
		subtitle: "Chicken burger with Mayo.",
		Patties: 0,
		premiumToppings: ["Chicken Patty"],
		standardToppings: ["Lettuce", "Pickles", "Standard Bun", "Mayo"],
		basePrice: 9.99
	},

	{
		title: "Veggie Burger",
		type: "burger",

		image_url: "https://i.imgur.com/z7ANC0C.jpg",
		subtitle: "Veggie burger with soy pattie.",
		premiumToppings: ["Soy Patty"],
		standardToppings: ["Standard Bun"],
		basePrice: 7.99
	},

	{
		title: "Top Bun",
		type: "burger",

		image_url: "https://i.imgur.com/6PnW8EE.jpg",
		subtitle:
			"Two beef Patties, fancy sauce, cheese, Pickles, chopped Lettuce, diced onion, served on a three part bun.",
		Patties: 2,
		premiumToppings: ["Three Part Bun", "Standard Cheese"],
		standardToppings: ["Fancy Sauce", "Pickles", "Lettuce", "Onions"],
		basePrice: 9.99
	},
	{
		title: "The Richmond",
		type: "burger",

		image_url: "https://i.imgur.com/z7ANC0C.jpg",
		subtitle: "Double cheese burger with Bacon & caramelized Onions.",

		Patties: 2,
		standardToppings: ["Standard Bun", "Fancy Sauce"],
		premiumToppings: ["Standard Cheese", "Caramelized Onions", "Bacon"],
		basePrice: 9.99
	},

	{
		title: "Breakfast At Tiffany's",
		type: "burger",

		image_url: "https://i.imgur.com/aUB3Mrd.jpg",
		subtitle:
			"Double cheese burger with Bacon, caramelized Onions & a friend egg.",

		Patties: 2,
		premiumToppings: ["Fried Egg", "Bacon", "Standard Cheese"],
		standardToppings: ["Onions", "Standard Bun"],
		basePrice: 10.99
	},

	{
		title: "Varsity Blues",
		type: "burger",

		image_url: "https://i.imgur.com/wySPVNs.jpg",
		subtitle: "Two beef Patties, Bacon, & blue cheese.",

		Patties: 2,
		premiumToppings: ["Blue Cheese", "Caramelized Onions", "Bacon"],
		standardToppings: ["Standard Bun"],
		basePrice: 9.99
	},

	{
		title: "Say Cheese",
		type: "burger",

		image_url: "https://i.imgur.com/Jq4kO7S.jpg",
		subtitle: "Double cheeseburger, stuffed between two grilled cheese buns.",
		Patties: 2,
		standardToppings: [],
		premiumToppings: ["Grilled Cheese Bun", "Standard Cheese"],
		basePrice: 10.99
	},

	{
		title: "The Portobello",
		type: "burger",

		image_url: "https://i.imgur.com/m4IQMAD.jpg",
		subtitle:
			"A Portobello stuffed with herbed cheese, rolled in panko crumbs & fried.",
		Patties: 0,
		premiumToppings: ["Stuffed Portobello"],
		standardToppings: ["Standard Bun"],
		basePrice: 7.99
	},

	{
		title: "Chicken Chicken",
		type: "burger",

		image_url: "https://i.imgur.com/N2IhDVG.jpg",
		subtitle: "Breaded chicken breast Mayo, chopped Lettuce and Pickles.",
		Patties: 0,
		premiumToppings: ["Chicken Patty"],
		standardToppings: ["Lettuce", "Pickles", "Standard Bun", "Mayo"],
		basePrice: 9.99
	},
	{
		title: "Swiss Bank Account",
		type: "burger",

		image_url: "https://i.imgur.com/cF4L5ZD.jpg",
		subtitle: "Two beef Patties, grilled mushrooms and swiss cheese.",

		Patties: 2,
		premiumToppings: ["Swiss Cheese", "Sauteed Mushrooms"],
		standardToppings: ["Standard Bun"],
		basePrice: 9.99
	},
	{
		title: "Fries",
		type: "side",

		image_url: "https://i.imgur.com/6PnW8EE.jpg",
		subtitle: "Perfectly cut, golden cripsy, potato Fries.",
		itemName: "Fries"

	},
	{
		title: "Poutine",
		type: "side",
		image_url: "https://i.imgur.com/6PnW8EE.jpg",
		subtitle: "Poutine, the Canadian way.",
		itemName: "Poutine"

	},

	{
		title: "Cheesy Fries",
		type: "side",
		image_url: "https://i.imgur.com/6PnW8EE.jpg",
		subtitle: "Cheesy Fries.",
		itemName: "Cheesy Fries"
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