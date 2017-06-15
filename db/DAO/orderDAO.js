const Order = require('./../schemas/order');

const orderDAO = {};


orderDAO.findAllOrders = function() {
	return new Promise ((resolve, reject) => {
		Order.find().sort({createdAt: -1})
			.then((orders) => {
				resolve(orders);
			}).catch((err) => reject(err));
	});
};

orderDAO.findAllOrdersFromUser = function(UserID) {
	return new Promise ((resolve, reject) => {
		Order.find({_user: UserID}).sort({createdAt: -1})
			.then((orders) => {
				resolve(orders);
			}).catch((err) => reject(err));
	});
};


orderDAO.findMostRecentUserOrder = function(userID, isConfirmed=false) {
	return new Promise ((resolve, reject) => {
		Order.findOne({_user: userID, isConfirmed: isConfirmed }).sort({createdAt: -1})
			.then((order) => {
				resolve(order);
			}).catch((err) => reject(err));
	});
};


orderDAO.isTherePreviousOrderFromUser = function(UserID, isConfirmed=false) {
	return new Promise((resolve, reject) => {
		Order.find({_user: UserID})
			.then((orders) => {
				if (!orders.length) {
					reject(false);
				}
				else {
					resolve(true);
				}
			});
	});
};


orderDAO.postNewOrder = function(userID) {
	return new Promise ((resolve, reject) => {
		const newOrder = new Order({
			_user: userID
		});

		newOrder.save()
			.then((order) => {
				resolve(order);
			}).catch((err) => reject(err));
	});
};




module.exports = orderDAO; 