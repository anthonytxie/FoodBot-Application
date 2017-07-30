const receiptTemplate = function(order) {
  const attachment = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: `Okay so, ${burger.title}, would you like the usual way or do you want to customize it?`,
            image_url: burger.image_url,
            buttons: [
              {
                type: "postback",
                title: "The Usual",
                payload: JSON.stringify({
                  type: "order-burger",
                  data: {
                    foodType: "burger",
                    customize: false,
                    foodObject: burger.burgerObject
                  }
                })
              },
              {
                type: "web_url",
                url: `https://foodbotapi.herokuapp.com/burgercustomize?order=${order._id}&name=${burger.title}`,
                title: "Open Combo Customize Webview",
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

  module.exports = {receiptTemplate}
};