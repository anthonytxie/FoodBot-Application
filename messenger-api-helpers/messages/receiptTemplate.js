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


// order = {
//   _id: "597fbf1c245369001139c528",
//   _user: "597fbf1c245369001139c526",
//   _session: "597fbf1c245369001139c527",
//   __v: 0,
//   isDelivery: false,
//   isConfirmed: false,
//   isCompleted: false,
//   createdAt: "2017-07-31T23:37:00.390Z",
//   _items: [
//     {
//       _id: "597fbf2c245369001139c52f",
//       _order: "597fbf1c245369001139c528",
//       patties: 1,
//       itemName: "Top Bun",
//       __v: 0,
//       kind: "Burger",
//       createdDate: "2017-07-31T23:37:16.764Z",
//       standardToppings: [
//         "standardBun",
//         "fancySauce",
//         "lettuce",
//         "pickles",
//         "onions"
//       ],
//       premiumToppings: ["standardCheese"],
//       itemType: "burger",
//       price: 9.99,
//       id: "597fbf2c245369001139c52f"
//     },
//     {
//       _id: "597fbf4e245369001139c530",
//       itemName: "gingerAle",
//       itemCombo: true,
//       __v: 0,
//       kind: "Drink",
//       createdDate: "2017-07-31T23:37:50.956Z",
//       itemType: "drink",
//       price: 1.29,
//       id: "597fbf4e245369001139c530"
//     },
//     {
//       _id: "597fbf4f245369001139c531",
//       __v: 0,
//       kind: "Sides",
//       createdDate: "2017-07-31T23:37:51.072Z",
//       itemCombo: true,
//       itemName: "smallFries",
//       itemType: "Sides",
//       price: 2,
//       id: "597fbf4f245369001139c531"
//     }
//   ],
//   orderPrice: "13.28",
//   id: "597fbf1c245369001139c528"
// };

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
  console.log(attachment)
  return attachment;
};

module.exports = { receiptMessageTemplate };