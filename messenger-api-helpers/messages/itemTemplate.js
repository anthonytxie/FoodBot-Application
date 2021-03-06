const { menuItems, findMenuItemsByItemName, getCurrencyFromIntegerPrice } = require("./../../config/menuItems");
const websiteURL = process.env.websiteURL;

const burgerTemplate = function(data, linkId, recipientId) {
  const burger = findMenuItemsByItemName(data.itemName);
  const attachment = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: `${burger.itemName} ($${getCurrencyFromIntegerPrice(burger.basePrice)})`,
            subtitle: burger.subtitle,
            image_url: burger.horizontal_image_url,
            buttons: [
              {
                type: "postback",
                title: "Standard Burger",
                payload: JSON.stringify({
                  type: "order-burger",
                  data:  {
                      _link: linkId,
                      itemName: burger.itemName,
                      Patties: burger.Patties,
                      standardToppings: burger.standardToppings,
                      premiumToppings: burger.premiumToppings
                    
                  }
                })
              },
              {
                type: "web_url",
                url: `${websiteURL}/burger?name=${burger.itemName}&sender=${recipientId}&linkId=${linkId.toString()}`,
                title: "Customize Burger",
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