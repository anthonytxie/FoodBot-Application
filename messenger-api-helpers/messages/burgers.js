const normalBurgers = [
	{
		title: "Double Hamburger (No Cheese)",
		image_url: "http://i.imgur.com/6PnW8EE.jpg",
		subtitle: "Two beef patties, on a sesame bun."
		burgerObject: {
			bunType: {
				patties: 2,
				fancySauce: true,
				

			}

		}
	},

	{
		title: "Double Cheeseburger",
		image_url: "http://i.imgur.com/z7ANC0C.jpg",
		subtitle: "Double cheese burger with caramelized onions."
	},

	{
		title: "Double Baconburger (No Cheese)",
		image_url: "http://i.imgur.com/aUB3Mrd.jpg",
		subtitle: "Two patties with bacon on a burger."
	},

	{
		title: "Double Bacon Cheeseburger",
		image_url: "http://i.imgur.com/wySPVNs.jpg",
		subtitle: "Two patties with bacon & cheese."
	},

	{
		title: "Chicken Burger",
		image_url: "http://i.imgur.com/6PnW8EE.jpg",
		subtitle: "Chicken burger with mayo."
	},

	{
		title: "Veggie Burger",
		image_url: "http://i.imgur.com/z7ANC0C.jpg",
		subtitle: "Veggie burger with soy pattie."
	}
];



bunType: {
    type: String,
    enum: ['white', 'rye', 'whole-wheat']
  },

  meatType: {
    type: String,
  },

  patties: {
    type: Number,
    default: 1,
    trim: true
  },

//cheeses
  cheddar: {
    type: Boolean,
    default: false,
  },


  blueCheese: {
    type: Boolean,
    default: false,
  },

  swiss: {
    type: Boolean,
    default: false,
  },

//toppings
  bacon: {
    type: Boolean,
    default: false ,
  },

  sauce: {
    type: String,
  },

  pickles: {
    type: Boolean,
    default: true,
  },

  lettuce: {
    type: Boolean,
    default: true
  },

  tomatoes: {
    type: Boolean,
    default: true
  },

  onions: {
    type: Boolean,
    default: true
  },

//special toppings
  fried: {
    type: Boolean,
    default: false
  },

  pankoCrumbs: {
    type: Boolean,
    default: false
  },

  egg: {
    type: Boolean,
    default: false,
  }

const specialBurgers = [
	{
		title: "Top Bun",
		image_url: "http://i.imgur.com/6PnW8EE.jpg",
		subtitle:
			"Two beef patties, fancy sauce, cheese, pickles, chopped lettuce, diced onion, served on a three part bun."
	},
	{
		title: "The Richmond",
		image_url: "http://i.imgur.com/z7ANC0C.jpg",
		subtitle: "Double cheese burger with bacon & caramelized onions."
	},

	{
		title: "Breakfast At Tiffany's",
		image_url: "http://i.imgur.com/aUB3Mrd.jpg",
		subtitle:
			"Double cheese burger with bacon, caramelized onions & a friend egg."
	},

	{
		title: "Varsity Blues",
		image_url: "http://i.imgur.com/wySPVNs.jpg",
		subtitle: "Two beef patties, bacon, & blue cheese."
	},

	{
		title: "Say Cheese",
		image_url: "http://i.imgur.com/Jq4kO7S.jpg",
		subtitle:
			"Double cheeseburger, stuffed between two grilled cheese buns."
	},

	{
		title: "The Portobello",
		image_url: "http://i.imgur.com/m4IQMAD.jpg",
		subtitle:
			"A Portobello stuffed with herbed cheese, rolled in panko crumbs & fried."
	}
];




module.exports = { normalBurgers, specialBurgers };