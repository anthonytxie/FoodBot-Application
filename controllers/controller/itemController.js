const itemDAO = require('../../db/dao/itemDAO')
const itemController = {};

itemController.post = (req, res) => {
	itemDAO.post()
    .then((item) => {
      res.send(item)
    }).catch((err) => res.send(err))
}


module.exports = { itemController };


