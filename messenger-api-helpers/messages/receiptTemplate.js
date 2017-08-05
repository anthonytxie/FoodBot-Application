const { menuItems, findItem } = require("./menuItems");

const receiptElements = function(order) {
  return order._items.map(x => {
    if (x.itemType === "burger") {
      let burger = findItem(x.itemName);
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
  return {
    attachment: {
      type: "template",
      payload: {
        template_type: "receipt",
        recipient_name: "Customer",
        order_number: order._id,
        currency: "CAD",
        payment_method: "Pick Up",
        timestamp: parseInt(((new Date).getTime())/1000).toString(),
        elements: receiptElements(order),
        summary: {
          subtotal: parseFloat(order.orderPrice),
          total_tax: parseFloat((order.orderPrice * 0.13).toFixed(2)),
          total_cost: parseFloat((order.orderPrice * 1.13).toFixed(2))
        }
      }
    }
  }
};



module.exports = { receiptMessageTemplate };