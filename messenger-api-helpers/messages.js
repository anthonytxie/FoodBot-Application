const messageTemplate = runnerPackage => {
  return { text: "this is the template message. " + runnerPackage };
};

const genericTemplate = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
           {
            "title":"Welcome to Peter\'s Hats",
            "image_url":"https://petersfancybrownhats.com/company_image.png",
            "subtitle":"We\'ve got the right hat for everyone.",
            "default_action": {
              "type": "web_url",
              "url": "https://peterssendreceiveapp.ngrok.io/view?item=103",
              "messenger_extensions": true,
              "webview_height_ratio": "tall",
              "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://petersfancybrownhats.com",
                "title":"View Website"
              },{
                "type":"postback",
                "title":"Start Chatting",
                "payload":"DEVELOPER_DEFINED_PAYLOAD"
              }              
            ]      
          }
        ]
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