const menuItems = [
	{
		itemName: "Single Hamburger",
		type: "burger",
		// image_url: "https://i.imgur.com/6PnW8EE.jpg",
		subtitle: "1 Beef Patty",
		Patties: 1,
		standardToppings: ["Sesame Bun"],
		premiumToppings: [],
		basePrice: 5.99
	},
	{
		itemName: "Single Cheeseburger",
		type: "burger",

		// image_url: "https://i.imgur.com/6PnW8EE.jpg",
		subtitle: "1 Beef Patty, Cheese",
		Patties: 1,
		standardToppings: ["Sesame Bun"],
		premiumToppings: ["Standard Cheese"],
		basePrice: 6.99
	},

	{
		itemName: "Single Baconburger",
		type: "burger",

		// image_url: "https://i.imgur.com/6PnW8EE.jpg",
		subtitle: "1 Beef Patty, Bacon",
		Patties: 1,
		standardToppings: ["Sesame Bun"],
		premiumToppings: ["Bacon"],
		basePrice: 7.49
	},

	{
		itemName: "Single Bacon Cheeseburger",
		type: "burger",

		// image_url: "https://i.imgur.com/6PnW8EE.jpg",
		subtitle: "1 Beef Patty, Bacon, Cheese",
		Patties: 1,
		standardToppings: ["Sesame Bun"],
		premiumToppings: ["Standard Cheese", "Bacon"],
		basePrice: 8.49
	},

	{
		itemName: "Double Hamburger (No Cheese)",
		type: "burger",

		// image_url: "https://i.imgur.com/6PnW8EE.jpg",
		subtitle: "2 Beef Patties",
		Patties: 2,
		standardToppings: ["Sesame Bun"],
		premiumToppings: [],
		basePrice: 7.99
	},

	{
		itemName: "Double Cheeseburger",
		type: "burger",

		// image_url: "https://i.imgur.com/z7ANC0C.jpg",
		subtitle: "2 Beef Patties, Cheese",

		Patties: 2,
		standardToppings: ["Sesame Bun"],
		premiumToppings: ["Standard Cheese"],
		basePrice: 8.99
	},

	{
		itemName: "Double Baconburger (No Cheese)",
		type: "burger",

		// image_url: "https://i.imgur.com/aUB3Mrd.jpg",
		subtitle: "2 Beef Patties, Bacon",

		Patties: 2,
		standardToppings: ["Sesame Bun"],
		premiumToppings: ["Bacon"],
		basePrice: 9.49
	},

	{
		itemName: "Double Bacon Cheeseburger",
		type: "burger",

		// image_url: "https://i.imgur.com/wySPVNs.jpg",
		subtitle: "Two Beef Patties, Cheese, Bacon",
		Patties: 2,
		standardToppings: ["Sesame Bun"],
		premiumToppings: ["Bacon", "Standard Cheese"],
		basePrice: 9.49
	},

	{
		itemName: "Chicken Burger",
		type: "burger",

		// image_url: "https://i.imgur.com/6PnW8EE.jpg",
		subtitle: "Chicken Burger, Lettuce, Pickles, Mayo",
		Patties: 0,
		premiumToppings: ["Chicken Patty"],
		standardToppings: ["Lettuce", "Pickles", "Sesame Bun", "Mayo"],
		basePrice: 9.99
	},

	{
		itemName: "Veggie Burger",
		type: "burger",

		image_url: "https://i.imgur.com/z7ANC0C.jpg",
		subtitle: "Veggie Burger with Soy Patty",
		premiumToppings: ["Soy Patty"],
		standardToppings: ["Sesame Bun"],
		basePrice: 7.99
	},

	{
		itemName: "Top Bun",
		type: "burger",

		image_url: "https://i.imgur.com/6PnW8EE.jpg",
		horizontal_image_url: "https://i.imgur.com/GhK3zW6.png",
		subtitle:
			"2 Beef Patties, Cheese, Pickles, Lettuce, Fancy Sauce, Onions",
		Patties: 2,
		premiumToppings: ["Three Part Bun", "Standard Cheese"],
		standardToppings: ["Fancy Sauce", "Pickles", "Lettuce", "Onions"],
		basePrice: 9.99
	},
	{
		itemName: "The Richmond",
		type: "burger",

		image_url: "https://i.imgur.com/z7ANC0C.jpg",
		horizontal_image_url: "https://i.imgur.com/WFBXYpd.png",
		subtitle:
			"2 Beef Patties, Bacon, Cheese, Caramelized Onions, Fancy Sauce",

		Patties: 2,
		standardToppings: ["Sesame Bun", "Fancy Sauce"],
		premiumToppings: ["Standard Cheese", "Caramelized Onions", "Bacon"],
		basePrice: 9.99
	},

	{
		itemName: "Breakfast At Tiffany's",
		type: "burger",

		image_url: "https://i.imgur.com/aUB3Mrd.jpg",
		horizontal_image_url: "https://i.imgur.com/HxrnbXZ.png",
		subtitle: "2 Beef Patties, Cheese, Bacon, Fried Egg, Onions",

		Patties: 2,
		premiumToppings: ["Fried Egg", "Bacon", "Standard Cheese"],
		standardToppings: ["Onions", "Sesame Bun"],
		basePrice: 10.99
	},

	{
		itemName: "Varsity Blues",
		type: "burger",

		image_url: "https://i.imgur.com/wySPVNs.jpg",
		subtitle: "2 Beef Patties, Bacon, Caramelized Onions, Blue Cheese",
		horizontal_image_url: "https://i.imgur.com/OlX0cBr.png",
		Patties: 2,
		premiumToppings: ["Blue Cheese", "Caramelized Onions", "Bacon"],
		standardToppings: ["Sesame Bun"],
		basePrice: 9.99
	},

	{
		itemName: "Say Cheese",
		type: "burger",

		image_url: "https://i.imgur.com/Jq4kO7S.jpg",
		horizontal_image_url: "https://i.imgur.com/0m48gFd.png",
		subtitle: "2 Beef Patties, Grilled Cheese Bun, Cheese",
		Patties: 2,
		standardToppings: [],
		premiumToppings: ["Grilled Cheese Bun", "Standard Cheese"],
		basePrice: 10.99
	},

	{
		itemName: "The Portobello",
		type: "burger",

		image_url: "https://i.imgur.com/m4IQMAD.jpg",
		horizontal_image_url: "https://i.imgur.com/3kQ6hQf.png",

		subtitle: "Stuffed Portobello, Tomatoes, Onions, Pickles",
		Patties: 0,
		premiumToppings: ["Stuffed Portobello"],
		standardToppings: ["Sesame Bun", "Tomatoes", "Onions", "Pickles"],
		basePrice: 7.99
	},

	{
		itemName: "Chicken Chicken",
		type: "burger",

		image_url: "https://i.imgur.com/N2IhDVG.jpg",
		horizontal_image_url: "https://i.imgur.com/gNpNg1c.png",

		subtitle: "Chicken Patty, Mayo, Lettuce, Pickles",
		Patties: 0,
		premiumToppings: ["Chicken Patty"],
		standardToppings: ["Lettuce", "Pickles", "Sesame Bun", "Mayo"],
		basePrice: 9.99
	},

	{
		itemName: "Swiss Bank Account",
		type: "burger",

		image_url: "https://i.imgur.com/cF4L5ZD.jpg",
		horizontal_image_url: "https://i.imgur.com/IaLrkat.png",

		subtitle: "2 Beef Patties, Grilled Mushrooms, Swiss Cheese",

		Patties: 2,
		premiumToppings: ["Swiss Cheese", "Sauteed Mushrooms"],
		standardToppings: ["Sesame Bun"],
		basePrice: 9.99
	},
	{
		itemName: "Fries",
		type: "side",

		image_url: "https://i.imgur.com/6PnW8EE.jpg",
		subtitle: "Perfectly cut, golden cripsy, potato Fries.",
		itemName: "Fries",
		basePrice: 3.99
	},
	{
		itemName: "Poutine",
		type: "side",
		image_url: "https://i.imgur.com/6PnW8EE.jpg",
		subtitle: "Poutine, the Canadian way.",
		itemName: "Poutine",
		basePrice: 7.99
	},

	{
		itemName: "Cheesy Fries",
		type: "side",
		image_url: "https://i.imgur.com/6PnW8EE.jpg",
		subtitle: "Cheesy Fries.",
		itemName: "Cheesy Fries",
		basePrice: 6.49
	},

	{
		itemName: "Milkshake",
		type: "side",
		image_url: "https://i.imgur.com/6PnW8EE.jpg",
		subtitle: "Delicious ice-cream milkshake",
		itemName: "milkshake",
		basePrice: 3.99
	}
];

const findItem = function(name) {
	return [...menuItems]
		.filter(x => {
			return x.itemName === name;
		})
		.pop();
};



const findDifferentItemsOnBurger = burgerObject => {
	let normalBurgerToppings = [
		...findItem(burgerObject.itemName).standardToppings,
		...findItem(burgerObject.itemName).premiumToppings
	].sort();

	let customizedBurgerToppings = [
		...burgerObject.standardToppings,
		...burgerObject.premiumToppings
	].sort();
	let normalBurgerPatties = findItem(burgerObject.itemName).Patties;
	let customizedBurgerPatties = burgerObject.Patties;

	const plusToppings = customizedBurgerToppings.filter(x => {
		return !normalBurgerToppings.includes(x);
	});
	const minusToppings = normalBurgerToppings.filter(x => {
		return !customizedBurgerToppings.includes(x);
	});
	const pattyDifference = customizedBurgerPatties - normalBurgerPatties;
	return {
		pattyDifference,
		minusToppings,
		plusToppings
	};
};


module.exports = { menuItems, findItem, findDifferentItemsOnBurger };
