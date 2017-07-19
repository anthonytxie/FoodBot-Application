const { Item, Sandwich } = require("../../db/schemas/item");
var itemDAO = {};

itemDAO.post = function(sessionId, foodObject) {
	return new Promise((resolve, sessionId) => {
		// itemMap.get(foodObject.type)

		const burger = new burgerItem({
			patties: 1
		});
		Order.findOne({ _session: sessionId })
			.sort({ createdAt: -1 })
			.then(order => {
				burger
					.save()
					.then(item => {
						resolve(
							populateOrder(
								Order.findOneAndUpdate(
									{ _id: order._id },
									{ $push: { _items: item._id } },
									{ new: true }
								)
							)
						);
					})
					.catch(err => reject(err));
			});
	});
};

module.exports = itemDAO;
