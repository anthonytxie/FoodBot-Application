const express = require('express');
const routes = express();
const itemDAO = require('./../../db/DAO/itemDAO');
const sessionDAO = require('./../../db/DAO/sessionDAO');


routes.post('/item', (req, res) => {
	// req.body is the body on the post request
	// this route requires the PSID on senderId and foodObject which will contain info about the food item being posted
	// the type of food e.g. fries, drink, or burer will need to be on foodObject.foodType
	const senderId = req.body.senderId;
	const foodObject = req.body.foodObject;
	sessionDAO.sessionRenewal(senderId) 
		.then((session) => {
			return itemDAO.post(foodObject, session._id);
		})
		.then((item) => {
			res.send(item);
		})
});


module.exports = routes;