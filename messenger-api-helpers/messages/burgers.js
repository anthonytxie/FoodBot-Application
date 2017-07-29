const normalBurgers = [
	{
		title: "Double Hamburger (No Cheese)",
		image_url: "http://i.imgur.com/6PnW8EE.jpg",
		subtitle: "Two beef patties, on a sesame bun.",
		burgerObject : {
			standardBun: true,
			patties: 2
		}
	},

	{
		title: "Double Cheeseburger",
		image_url: "http://i.imgur.com/z7ANC0C.jpg",
		subtitle: "Double cheese burger with caramelized onions.",
		burgerObject : {
			standardBun: true,
			patties: 2,
			standardCheese: true
		}
	},

	{
		title: "Double Baconburger (No Cheese)",
		image_url: "http://i.imgur.com/aUB3Mrd.jpg",
		subtitle: "Two patties with bacon on a burger.",
		burgerObject : {
			standardBun: true,
			patties: 2,
			bacon: true
		}
	},

	{
		title: "Double Bacon Cheeseburger",
		image_url: "http://i.imgur.com/wySPVNs.jpg",
		subtitle: "Two patties with bacon & cheese.",
		burgerObject : {
			standardBun: true,
			patties: 2,
			bacon: true,
		}
	},

	{
		title: "Chicken Burger",
		image_url: "http://i.imgur.com/6PnW8EE.jpg",
		subtitle: "Chicken burger with mayo.",
		burgerObject : {
			standardBun: true,
			chickenPatty: true,
			lettuce: true,
			mayo: true
		}
	},

	{
		title: "Veggie Burger",
		image_url: "http://i.imgur.com/z7ANC0C.jpg",
		subtitle: "Veggie burger with soy pattie.",
		burgerObject : {
			standardBun: true,
			patties: 2,
			soyPatty: true
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
				threePartBun: true,
				patties: 2,
				fancySauce: true,
				standardCheese: true,
				pickles: true,
				lettuce: true,
				onions: true,
			}
	},
	{
		title: "The Richmond",
		image_url: "http://i.imgur.com/z7ANC0C.jpg",
		subtitle: "Double cheese burger with bacon & caramelized onions.",
		burgerObject: {
				bunType: "standard",
				patties: 2,
				fancySauce: true,
				standardCheese: true,
				caramelizedOnions: true,
				bacon: true,
			}
	},

	{
		title: "Breakfast At Tiffany's",
		image_url: "http://i.imgur.com/aUB3Mrd.jpg",
		subtitle:
			"Double cheese burger with bacon, caramelized onions & a friend egg.",
		burgerObject: {
				bunType: "standard",
				patties: 2,
				standardCheese: true,
				onions: true,
				bacon: true,
				friedEgg: true,
			}
	},

	{
		title: "Varsity Blues",
		image_url: "http://i.imgur.com/wySPVNs.jpg",
		subtitle: "Two beef patties, bacon, & blue cheese.",
		burgerObject: {
				bunType: "standard",
				patties: 2,
				blueCheese: true,
				caramelizedOnion: true,
				bacon: true,
			}
	},

	{
		title: "Say Cheese",
		image_url: "http://i.imgur.com/Jq4kO7S.jpg",
		subtitle:
			"Double cheeseburger, stuffed between two grilled cheese buns.",
		burgerObject: {
				bunType: "grilled-cheese",
				patties: 2,
			}
	},

	{
		title: "The Portobello",
		image_url: "http://i.imgur.com/m4IQMAD.jpg",
		subtitle:
			"A Portobello stuffed with herbed cheese, rolled in panko crumbs & fried.",
		burgerObject: {
				bunType: "standard",
				stuffedPortobello: true,
				pankoCrumbs: true,
				fried: true
			}
	},

	{
		title: "Chicken Chicken",
		image_url: "http://i.imgur.com/m4IQMAD.jpg",
		subtitle:
			"Breaded chicken breast mayo, chopped lettuce and pickles.",
		burgerObject: {
				bunType: "standard",
				chickPatty: true,
				lettuce: true,
				pickles: true
			}
	},
	{
		title: "Swiss Bank Account",
		image_url: "http://i.imgur.com/m4IQMAD.jpg",
		subtitle:
			"Two beef patties, grilled mushrooms and swiss cheese.",
		burgerObject: {
				bunType: "standard",
				patties: 2,
				sauteedMushrooms: true,
				swissCheese: true
			}
	},
];




module.exports = { normalBurgers, specialBurgers };