const { normalBurgers, specialBurgers, findBurger } = require("./burgers");

const receiptElements = function(order) {
  return order._items.map(x => {
    if (x.itemType === "burger") {
      let burger = findBurger(x.itemName);
      return {
        title: burger.title,
        subtitle: burger.subtitle,
        price: x.price,
        currency: "CAD",
        image_url: burger.image_url
      };
    } else {
      return {
        title: x.itemName,
        price: x.price,
        currency: "CAD"
      };
    }
  });
};


const receiptMessageTemplate = function(order) {
  return { text: 'receipt' } 
};



module.exports = { receiptMessageTemplate };