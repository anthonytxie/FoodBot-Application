const { menuItems, findItem } = require("./menuItems");
const websiteURL = process.env.websiteURL;

const burgerTemplate = function(data, linkId, recipientId) {
  const burger = findItem(data.itemName);
  const attachment = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: `${burger.itemName} ($${burger.basePrice})`,
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
                url: `${websiteURL}/burgercustomize?name=${burger.itemName}&sender=${recipientId}&linkId=${linkId.toString()}`,
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