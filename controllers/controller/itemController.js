const itemDAO = require('../../db/dao/itemDAO')
const itemController = {};

itemController.post = () => {
	return itemDAO.post()
}


module.exports = { itemController };


