const messageTemplate = runnerPackage => {
  return { text: "this is the template message. " + runnerPackage };
};

const genericTemplate = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: "rift",
            subtitle: "Next-generation virtual reality",
            item_url: "https://www.oculus.com/en-us/rift/",               
            image_url: "http://messengerdemo.parseapp.com/img/rift.png",
            buttons: [{
              type: "web_url",
              url: "https://www.oculus.com/en-us/rift/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback",
              payload: "Payload for first bubble",
            }],
          }, {
            title: "touch",
            subtitle: "Your Hands, Now in VR",
            item_url: "https://www.oculus.com/en-us/touch/",               
            image_url: "http://messengerdemo.parseapp.com/img/touch.png",
            buttons: [{
              type: "web_url",
              url: "https://www.oculus.com/en-us/touch/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback",
              payload: "Payload for second bubble",
            }]
          }]
        }
      }
    }

const newOrderButton = {
  type: "postback",
  title: "New Order",
  payload: JSON.stringify({
    type: "create_new_order"
  })
};

const orderBurgerButton = {
  type: "postback",
  title: "Order Burger",
  payload: JSON.stringify({
    type: "order-burger"
  })
};

const orderDrinkButton = {
  type: "postback",
  title: "Order Drink",
  payload: JSON.stringify({
    type: "order-drink"
  })
};

const orderMilkshakeButton = {
  type: "postback",
  title: "Order Milkshake",
  payload: JSON.stringify({
    type: "order-milkshake"
  })
};

const orderFriesButton = {
  type: "postback",
  title: "Order Fries",
  payload: JSON.stringify({
    type: "order-fries"
  })
};

const initializeButton = {
  type: "postback",
  title: "Initialize",
  payload: JSON.stringify({
    type: "initialize"
  })
};

const nestedOrderButtons = {
  type: "nested",
  title: "Order Food",
  call_to_actions: [
    orderBurgerButton,
    orderFriesButton,
    orderDrinkButton,
    orderMilkshakeButton
  ]
};

const persistentMenu = {
  persistent_menu: [
    {
      locale: "default",
      composer_input_disabled: false,
      call_to_actions: [
        {
          title: "Order Food",
          type: "nested",
          call_to_actions: [
            orderBurgerButton,
            orderFriesButton,
            orderMilkshakeButton,
            orderDrinkButton
          ]
        },
        initializeButton,
        newOrderButton
      ]
    }
  ]
};

const getStarted = {
  setting_type: "call_to_actions",
  thread_state: "new_thread",
  call_to_actions: [
    {
      payload: JSON.stringify({
        type: "initialize"
      })
    }
  ]
};

module.exports = { messageTemplate, persistentMenu, getStarted, genericTemplate };