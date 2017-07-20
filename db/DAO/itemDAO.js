const { Order } = require("./../index");
const { Item, Burger, Drink, Side } = require("../../db/schemas/item");
var itemDAO = {};
const { populateOrder } = require("./helperFunctions");


const itemMap = new Map();

itemMap.set("burger", Burger);
itemMap.set("drink", Drink);
itemMap.set("side", Side);


itemDAO.post = function(sessionId, foodObject) {
	return new Promise((resolve, sessionId) => {
		// itemMap.get(foodObject.type)

		const item = new itemMap.get(foodObject.itemType)


		Order.findOne().then((order) => {
			item.save().then((item) => {
				resolve(
					populateOrder(
						Order.findOneAndUpdate(
							{ _id: order._id },
							{ $push: { _items: item._id } },
							{ new: true }
						)
					)
				);
			});
		});
	});
};
module.exports = itemDAO;