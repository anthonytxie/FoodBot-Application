const { normalBurgers, specialBurgers, findBurger } = require("./burgers");

const receiptElements = function(order) {
  return order._items.map(x => {
    if (x.itemType === "burger") {
      let burger = findBurger(x.name);
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
  const attachment = {
    attachment: {
      type: "template",
      payload: {
        recipient_name: "Customer",
        template_type: "receipt",
        order_number: order._id,
        currency: "CAD",
        payment_method: "Pick Up",
        timestamp: Date.now(),
        elements: receiptElements(order),
        summary: {
          subtotal: order.orderPrice,
          total_tax: order.orderPrice * 0.13,
          total_cost: order.orderPrice * 1.13
        },
      }
    }
  };

  return attachment;
};

module.exports = { receiptMessageTemplate };