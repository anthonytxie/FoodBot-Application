const burgerController = {};
const Burger = require('./../db/models/Burger');
const Order = require('./../db/models/Order');

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

	const order = req.session.order

	burger.save()
		.then((burger) => {
			return Order.findOneAndUpdate(order._id, { $push: {'_burgers': burger._id}})
		})
		.then((updatedUser) => {
			return res.send(updatedUser)
		
		})
};

module.exports = burgerController;


