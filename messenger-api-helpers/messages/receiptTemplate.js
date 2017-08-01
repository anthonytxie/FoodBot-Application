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
        }
      }
    }
  };
  console.log(JSON.stringify(attachment));
  return {
    attachment: {
      type: "template",
      payload: {
        template_type: "receipt",
        recipient_name: "Stephane Crozatier",
        order_number: "12345678902",
        currency: "USD",
        payment_method: "Visa 2345",
        order_url: "http://petersapparel.parseapp.com/order?order_id=123456",
        timestamp: "1428444852",
        elements: [
          {
            title: "Classic White T-Shirt",
            subtitle: "100% Soft and Luxurious Cotton",
            quantity: 2,
            price: 50,
            currency: "USD",
            image_url: "http://petersapparel.parseapp.com/img/whiteshirt.png"
          },
          {
            title: "Classic Gray T-Shirt",
            subtitle: "100% Soft and Luxurious Cotton",
            quantity: 1,
            price: 25,
            currency: "USD",
            image_url: "http://petersapparel.parseapp.com/img/grayshirt.png"
          }
        ],
        address: {
          street_1: "1 Hacker Way",
          street_2: "",
          city: "Menlo Park",
          postal_code: "94025",
          state: "CA",
          country: "US"
        },
        summary: {
          subtotal: 75.0,
          shipping_cost: 4.95,
          total_tax: 6.19,
          total_cost: 56.14
        },
        adjustments: [
          {
            name: "New Customer Discount",
            amount: 20
          },
          {
            name: "$10 Off Coupon",
            amount: 10
          }
        ]
      }
    }
  };
};



// const attachment = {
//   type: "template",
//   payload: {
//     recipient_name: "Customer",
//     template_type: "receipt",
//     order_number: "597fc47820ddd60011550f37",
//     currency: "CAD",
//     payment_method: "Pick Up",
//     timestamp: 1501545620227,
//     elements: [
//       {
//         title: "Varsity Blues",
//         subtitle: "Two beef patties, bacon, & blue cheese.",
//         price: 9.99,
//         currency: "CAD",
//         image_url: "http://i.imgur.com/wySPVNs.jpg"
//       }
//     ],
//     summary: {
//       subtotal: "9.99",
//       total_tax: 1.2987,
//       total_cost: 11.288699999999999
//     }
//   }
// };



module.exports = { receiptMessageTemplate };