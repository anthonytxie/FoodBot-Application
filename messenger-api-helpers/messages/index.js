const {
  menuMessage,
  specialBurgerMenuMessageOne,
  specialBurgerMenuMessageTwo,
  normalBurgerMenuMessageOne,
  normalBurgerMenuMessageTwo,
  normalBurgerMenuMessageThree
} = require("./menu");

const {receiptMessageTemplate} = require('./receiptTemplate');

const { burgerTemplate } = require("./burgerTemplate");

const messageTemplate = message => {
  return { text: message };
};


// ===== PERSISTENT MENU ===============================================================

const seeMenuButton = {
  type: "postback",
  title: "See Menu",
  payload: JSON.stringify({
    type: "see-menu"
  })
};

const newOrderButton = {
  type: "postback",
  title: "New Order",
  payload: JSON.stringify({
    type: "create_new_order"
  })
};


const persistentMenu = {
  persistent_menu: [
    {
      locale: "default",
      composer_input_disabled: false,
      call_to_actions: [
        seeMenuButton,
        newOrderButton
      ]
    }
  ]
};


// ===== GETTING STARTED ===============================================================

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
      text: `Hey :)\n\nWelcome to Burger Burger! To see what we have cooking view our Menu! To order, just tap order.`,
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


// ===== ORDERS ===============================================================

const upsizeOrderMessage = function(order, senderId) {
  const attachment = {
    attachment: {
      type: "template",
      payload: {
        template_type: "button",
        text: "Would you like to make that a combo? (Fries & Drink)",
        buttons: [
          {
            type: "web_url",
            url: `https://foodbotapi.herokuapp.com/burgercombo?order=${order._id}&sender=${senderId}`,
            title: "Yes",
            webview_height_ratio: "full",
            messenger_extensions: true
          },
          {
            type: "postback",
            title: "No",
            payload: JSON.stringify({
              type: "order-continue"
            })
          }

        ]
      }
    }
  };
  return attachment;
};



const orderAskContinue = function(order) {
  const attachment = {
    attachment: {
      type: "template",
      payload: {
        template_type: "button",
        text:
          "Alright! We added that to your order. Are you done or would you like to order more?",
        buttons: [
          {
            type: "postback",
            title: "Order More",
            payload: JSON.stringify({
              type: "see-menu"
            })
          },
          {
            type: "postback",
            title: "Done",
            payload: JSON.stringify({
              type: "see-receipt"
            })
          }
          // {
          //   type: "web_url",
          //   url: `https://foodbotapi.herokuapp.com/receipt?order=${order._id}`,
          //   title: "Done",
          //   webview_height_ratio: "full",
          //   messenger_extensions: true
          // }
        ]
      }
    }
  };
  return attachment;
};


module.exports = {
  messageTemplate,
  persistentMenu,
  getStarted,
  welcomeMessage,
  menuMessage,
  specialBurgerMenuMessageOne,
  specialBurgerMenuMessageTwo,
  normalBurgerMenuMessageOne,
  normalBurgerMenuMessageTwo,
  normalBurgerMenuMessageThree,
  burgerTemplate,
  upsizeOrderMessage,
  orderAskContinue,
  receiptMessageTemplate
};
