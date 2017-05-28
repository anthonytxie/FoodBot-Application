const burgerController = {};
const Burger = require('./../db/models/Burger');


burgerController.post = (req, res) => {
	const {
		bunType,
		meatType,
		patties,
		cheddar,
		blueCheese,
		swiss,
		bacon,
		sauce,
		pickles,
		lettuce,
		tomatoes,
		onions,
		fried,
		pankoCrumbs,
		egg
	} = req.body

	const burger = new Burger({
		bunType,
		meatType,
		patties,
		cheddar,
		blueCheese,
		swiss,
		bacon,
		sauce,
		pickles,
		lettuce,
		tomatoes,
		onions,
		fried,
		pankoCrumbs,
		egg
	});

	burger.save()
		.then((burger) => {
			res.send(burger);
		}).catch((err) => {
			res.send(err);
		})

};

module.exports = burgerController;


