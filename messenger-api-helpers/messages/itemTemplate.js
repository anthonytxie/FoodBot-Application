const { menuItems, findItem } = require("./menuItems");

const burgerTemplate = function(data, package, recipientId) {
  const burger = findItem(data.title);
  const attachment = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: `Okay so, ${burger.title}, the usual way or customized?`,
            image_url: burger.image_url,
            buttons: [
              {
                type: "postback",
                title: "The Usual",
                payload: JSON.stringify({
                  type: "order-burger",
                  data: {
                    senderId: recipientId,
                    _link: package.linkId,
                    foodObject: {
                      _link: package.linkId,
                      itemName: burger.title,
                      patties: burger.patties,
                      standardToppings: burger.standardToppings,
                      premiumToppings: burger.premiumToppings
                    }
                  }
                })
              },
              {
                type: "web_url",
                url: `https://foodbotstaging.herokuapp.com/burgercustomize?name=${burger.title}&sender=${recipientId}&linkId=${package.linkId}`,
                title: "Customize",
                webview_height_ratio: "full",
                messenger_extensions: true
              }
            ]
          }
        ]
      }
    }
  };
  return attachment;
};



module.exports = { burgerTemplate };