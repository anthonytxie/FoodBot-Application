const { Link } = require("./../models/index");
const mongoose = require("mongoose");
const linkDAO = {};

linkDAO.createNewLink = function() {
	return new Promise((resolve, reject) => {
		const link = new Link();
		link
			.save()
			.then(link => {
				resolve(link);
			})
			.catch(err => reject(link));
	});
};


module.exports = linkDAO;
