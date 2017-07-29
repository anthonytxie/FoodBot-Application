const {
    menuMessage,
    specialBurgerMenuMessageOne,
    specialBurgerMenuMessageTwo,
    normalBurgerMenuMessageOne,
    normalBurgerMenuMessageTwo
} = require("./menu");

const { burgerTemplate } = require('./burgerTemplate');


const messageTemplate = runnerPackage => {
  return { text: "this is the template message. " + runnerPackage };
};

const confirmOrderButton = {
  type: "postback",
  title: "Confirm Order",
  payload: JSON.stringify({
    type: "confirm-order"
  })
};

const unconfirmOrderButton = {
  type: "postback",
  title: "Unconfirm Order",
  payload: JSON.stringify({
    type: "unconfirm-order"
  })
};

const deleteLastItemButton = {
  type: "postback",
  title: "Delete Last Item",
  payload: JSON.stringify({
    type: "delete-last-item"
  })
};

const showOrderDetailsButton = {
  type: "postback",
  title: "Show Order Details",
  payload: JSON.stringify({
    type: "show-current-order"
  })
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
    type: "order-item",
    data: {
      foodType: "burger"
    }
  })
};

const orderDrinkButton = {
  type: "postback",
  title: "Order Drink",
  payload: JSON.stringify({
    type: "order-item",
    data: {
      foodType: "drink"
    }
  })
};

const orderSideButton = {
  type: "postback",
  title: "Order Side",
  payload: JSON.stringify({
    type: "order-item",
    data: {
      foodType: "side"
    }
  })
};

const initializeButton = {
  type: "postback",
  title: "Initialize",
  payload: JSON.stringify({
    type: "initialize"
  })
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
            orderSideButton,
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

const welcomeMessage = {
  attachment: {
    type: "template",
    payload: {
      template_type: "button",
      text: `Hey :) \n\n Welcome to Burger Burger! To see what we have cooking view our Menu! To order, just tap order.`,
      buttons: [
        {
          type: "postback",
          title: "See Menu",
          payload: JSON.stringify({
            type: "see-menu"
          })
        },
        {
          type: "postback",
          title: "Order",
          payload: JSON.stringify({
            type: "see-menu"
          })
        }
      ]
    }
  }
};



const webviewButton = {
  type: "web_url",
  url: "https://foodbotapi.herokuapp.com",
  title: "Open Webview",
  webview_height_ratio: "full"
};

const genericTemplate = {
  attachment: {
    type: "template",
    payload: {
      template_type: "generic",
      elements: [
        {
          title: "Webview",
          subtitle: "Webview test",
          item_url: "https://www.oculus.com/en-us/rift/",
          image_url: "http://messengerdemo.parseapp.com/img/rift.png",
          buttons: [webviewButton]
        },
        {
          title: "Order Commands",
          subtitle: "Your Hands, Now in VR",
          item_url: "https://www.oculus.com/en-us/touch/",
          image_url: "http://messengerdemo.parseapp.com/img/touch.png",
          buttons: [deleteLastItemButton, showOrderDetailsButton]
        }
      ]
    }
  }
};


const upsizeOrderMessage = {
    text: "Would you like to make that a combo? (Fries & Drink)",
    quick_replies: [
        {
            content_type: "text",
            title: "Yes",
            payload: JSON.stringify({
                type: "upgrade-combo"
            })
        },
        {
            content_type: "text",
            title: "No",
            payload: JSON.stringify({
                type: "order-continue"
            })
        }
    ]
};


const orderAskContinue = {
    text: "Alright! We added that to your order. Are you done or would you like to order more?",
    quick_replies: [
        {
            content_type: "text",
            title: "Order More",
            payload: JSON.stringify({
                type: "see-menu"
            })
        },
        {
            content_type: "text",
            title: "Done",
            payload: JSON.stringify({
                type: "confirm-order"
            })
        }
    ]
};


const confirmedMessageTemplate = () => {
  return { text: "Ok we've confirmed the order" };
};

module.exports = {
  messageTemplate,
  persistentMenu,
  getStarted,
  genericTemplate,
  welcomeMessage,
  menuMessage,
  specialBurgerMenuMessageOne,
  specialBurgerMenuMessageTwo,
  normalBurgerMenuMessageOne,
  normalBurgerMenuMessageTwo,
  burgerTemplate,
  upsizeOrderMessage,
  confirmedMessageTemplate,
  orderAskContinue
};