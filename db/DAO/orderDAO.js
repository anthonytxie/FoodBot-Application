const {Burger, Fry, Drink, Milkshake, Order, Session } = require('./../index');
const mongoose = require('mongoose');
const orderDAO = {};
const {populateOrder}  = require('./helperFunctions');

const itemMap = new Map()

itemMap.set('burger', Burger)
itemMap.set('milkshake', Milkshake)
itemMap.set('drink', Drink)
itemMap.set('fry', Fry)

orderDAO.initializeOrder = function(sessionId) {
    return new Promise((resolve, reject) => {
        Session.findOne({session: sessionId})
        .then((session) => {
            if (!session) {
                return false ;
            }
            else {
                return session;
            }
        }).catch((err) => reject(err))

        .then((session) => {
            if (!session) {
               let newSession = new Session({session: sessionId});
               newSession.save() 
               .then((session) => {
                  return session
              }).catch((err) => reject(err))
               .then((sessionId) => {
                  const newOrder = new Order({_session: sessionId._id});
                  newOrder.save()
                  .then((order) => {
                     return populateOrder(Order.findOne({_id: order._id}))
                 }).catch((err)=> reject(err))
                  .then((order)=> {
                    resolve(order);
                });
              });
           }

           else {
               const newOrder = new Order({_session: session._id});
               newOrder.save()
               .then((order) => {
                  return populateOrder(Order.findOne({_id: order._id}))
              }).catch((err) => reject(err))
               .then((order)=> {
                  resolve(order);
              });
           }
       });
    });
};



orderDAO.confirmOrder = function(session) {
	return new Promise ((resolve, reject) => {
        Session.findOne({session: session})
        .then((session) => populateOrder(Order.findOneAndUpdate({_session: session._id}, {isConfirmed: true}, {new: true})).sort({createdAt: -1})).catch((err) => reject(err))
        .then((order) => resolve(order)).catch((err) => reject(err))
    });
};

orderDAO.unconfirmOrder = function(session) {
  return new Promise ((resolve, reject) => {
    Session.findOne({session: session})
    .then((session) => populateOrder(Order.findOneAndUpdate({_session: session._id}, {isConfirmed: false}, {new: true})).sort({createdAt: -1})).catch((err) => reject(err))
    .then((order) => resolve(order)).catch((err) => reject(err))
});
};


orderDAO.showOrderDetails = function(session) {
    return new Promise((resolve, reject) => {
        Session.findOne({session: session})
        .then((session) => populateOrder(Order.findOne({_session:session})).sort({createdAt: -1})).catch((err) => reject(err))
        .then((order) => {
            resolve(order);
        }).catch((err) => reject(err));
    });
};



// orderDAO.deleteItem = function(orderID,itemType,itemObject) {
// 	return new Promise((resolve, reject) => {
// 		populateOrder(Order.findOne({_id: orderID}))
// 			.then((order) => {
// 				if (itemType ==='burger') {
// 					Burger.findOneAndRemove({itemObject});
// 				}
// 				else if (itemType ==='milkshake') {
// 					Milkshake.findOneAndRemove({itemObject});
// 				}
// 				else if (itemType ==='drink') {
// 					Drink.findOneAndRemove({itemObject});
// 				}
// 				else if (itemType ==='fry') {
// 					Fry.findOneAndRemove({itemObject});
// 				}
// 			})
// 		.then((deletedItem) => {
// 			resolve(deletedItem);
// 		});
// 	});
// };


orderDAO.deleteMostRecentItemAdded = function(session) {
	return new Promise ((resolve,reject) => {
        Session.findOne({session: session})
        .then((session) => populateOrder(Order.findOne({_session:session._id}).sort({createdAt: -1})))
        .then((order) => {
            if (order.itemArray.length <= 0) {
               return resolve(order);
           }
           else {
               let mostRecentOrder = order.itemArray[0];
               return order;
           }
       })
        .then((order) => {
            let mostRecentOrder = order.itemArray[0];
            let id = mongoose.Types.ObjectId(mostRecentOrder[0])
            return itemMap.get(mostRecentOrder[2]).findOneAndRemove({_id: id})        
        })
        .then((item) => {
            resolve(item)
        })
    })
}


module.exports = orderDAO; 