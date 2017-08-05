const order ={
  _items:[
    {
      _id: "5986293285d8040011ba1f6b",
      patties: 2,
      itemName: "Breakfast At Tiffany's",
      __v: 0,
      kind: "Burger",
      createdDate: "2017-08-05T20:23:14.817Z",
      standardToppings: ["tomatoes", "onions"],
      premiumToppings: [
        "glutenFreeBun",
        "bacon",
        "standardCheese",
        "blueCheese"
      ],
      itemType: "burger",
      id: "5986293285d8040011ba1f6b",
      price: 13.99
    },
    {
      _id: "5986293f85d8040011ba1f6c",
      itemName: "strawberryMilkshake",
      itemCombo: true,
      __v: 0,
      kind: "Drink",
      createdDate: "2017-08-05T20:23:27.367Z",
      itemType: "drink",
      id: "5986293f85d8040011ba1f6c",
      price: 2.99
    },
    {
      _id: "5986293f85d8040011ba1f6d",
      itemName: "poutine",
      __v: 0,
      kind: "Sides",
      createdDate: "2017-08-05T20:23:27.380Z",
      itemCombo: true,
      itemType: "side",
      id: "5986293f85d8040011ba1f6d",
      price: 6
    },
    {
      _id: "5986294c85d8040011ba1f6e",
      _order: "5986292385d8040011ba1f6a",
      itemName: "Double Cheeseburger",
      patties: 2,
      __v: 0,
      kind: "Burger",
      createdDate: "2017-08-05T20:23:40.780Z",
      standardToppings: ["standardBun"],
      premiumToppings: ["standardCheese"],
      itemType: "burger",
      id: "5986294c85d8040011ba1f6e",
      price: 8.99
    },
    {
      _id: "5986295885d8040011ba1f6f",
      itemName: "poutine",
      __v: 0,
      kind: "Sides",
      createdDate: "2017-08-05T20:23:52.724Z",
      itemCombo: false,
      itemType: "side",
      id: "5986295885d8040011ba1f6f",
      price: 7.99
    },
    {
      _id: "5986296885d8040011ba1f70",
      patties: 2,
      itemName: "Double Baconburger (No Cheese)",
      __v: 0,
      kind: "Burger",
      createdDate: "2017-08-05T20:24:08.483Z",
      standardToppings: ["standardBun"],
      premiumToppings: ["bacon"],
      itemType: "burger",
      id: "5986296885d8040011ba1f70",
      price: 9.49
    },
    {
      _id: "5986297085d8040011ba1f71",
      itemName: "strawberryMilkshake",
      itemCombo: true,
      __v: 0,
      kind: "Drink",
      createdDate: "2017-08-05T20:24:16.186Z",
      itemType: "drink",
      id: "5986297085d8040011ba1f71",
      price: 2.99
    },
    {
      _id: "5986297085d8040011ba1f72",
      itemName: "poutine",
      __v: 0,
      kind: "Sides",
      createdDate: "2017-08-05T20:24:16.199Z",
      itemCombo: true,
      itemType: "side",
      id: "5986297085d8040011ba1f72",
      price: 6
    }
  ]
} 
let comboArray = [];
let array = [];

for (i = 0; i < order._items.length; i++) {
  if (order._items[i].itemCombo) {
    if (order._items[i - 1].itemType === "burger") {
      array.push(order._items[i - 1]);
    } else {
      array.push(order._items[i - 1]);
      array.push(order._items[i]);
    }
  }
}

while (array.length > 0) comboArray.push(array.splice(0, 3));

console.log(comboArray)