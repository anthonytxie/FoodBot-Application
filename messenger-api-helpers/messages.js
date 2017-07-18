const messageTemplate = runnerPackage => {
  return { text: "this is the template message. " + runnerPackage };
};

const genericTemplate = {
  attachment: {
    type: "template",
    payload: {
      template_type: "generic",
      elements: [
        {
          title: "confirm commands",
          buttons: [
            {
              type: "postback",
              title: "Confirm Order",
              payload: {
                type: 'confirm-order'
              }
            },
            {
              type: "postback",
              title: "Unconfirm Order",
              payload: {
                type: 'unconfirm-order'
              }
            }
          ]
        },
        {
          title: "Order Commands",
          buttons: [
            {
              type: "postback",
              title: "Delete Most Recent Item Added",
              payload: {
                type: 'delete-last-item'
              }
            },
            {
              type: "postback",
              title: "Show Current Order",
              payload: {
                type: 'show-current-order'
              }
            }
          ]
        }
      ]
    }
  }
};

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

module.exports = { messageTemplate, persistentMenu, getStarted };