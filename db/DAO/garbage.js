// FOR CHANDLER'S DEPRAVED TESTING PURPOSE ONLY

const orderDAO = require("./orderDAO");
const itemDAO = require("./itemDAO");
const linkDAO = require('./linkDAO');

const addMassiveOrder = (senderId, orderId) => {
  let firstLinkId;
  return new Promise((resolve, reject) => {
    orderDAO
      .findOrderById(orderId)
      .then(order => {
        return linkDAO.createNewLink();
      })
      .then(link => {
        firstLinkId = link._id;
        return itemDAO.postBurger(
          {
            _link: link._id,
            _order: orderId,
            itemName: "The Portobello",
            Patties: 0,
            standardToppings: ["Sesame Bun", "Tomatoes", "Onions", "Pickles"],
            premiumToppings: ["Stuffed Portobello"]
          },
          senderId
        );
      })
      .then(burger => {
        return itemDAO.postSide(
          {
            _link: firstLinkId,
            _order: orderId,
            itemName: "Poutine",
            itemCombo: true,
            itemSize: "Medium"
          },
          senderId
        );
      })
      .then(side => {
        return itemDAO.postDrink(
          {
            _link: firstLinkId,
            _order: orderId,
            itemName: "Vanilla Milkshake",
            itemCombo: true
          },
          senderId
        );
      })
      .then(drink => {
        return linkDAO.createNewLink();
      })
      .then(link => {
        return itemDAO.postBurger(
          {
            _link: link._id,
            _order: orderId,
            itemName: "Chicken Chicken",
            Patties: 0,
            premiumToppings: ["Chicken Patty"],
            standardToppings: ["Lettuce", "Pickles", "Sesame Bun", "Mayo"]
          },
          senderId
        );
      })
      .then(burger => {
        return itemDAO.postDrink(
          {
            itemName: "Rootbeer"
          },
          senderId
        );
      })
      .then(() => {
        return linkDAO.createNewLink;
      })
      .then(link => {
        return itemDAO.postBurger(
          {
            _link: link._id,
            _order: orderId,
            itemName: "Swiss Bank Account",
            Patties: 3,
            premiumToppings: ["Swiss Cheese", "Bacon"],
            standardToppings: ["Sesame Bun"]
          },
          senderId
        );
      })
      .then(side => {
        resolve("done");
      })
      .catch(err => reject(err));
  });
};

module.exports = {addMassiveOrder}
