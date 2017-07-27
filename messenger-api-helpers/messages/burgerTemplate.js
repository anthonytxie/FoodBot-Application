const { normalBurgers, specialBurgers } = require("./burgers");

const findBurger = function(payloadData) {
	[normalBurgers,...specialBurgers].filter((x) => {
		return x.title === payloadData.title;
	});
};

const burgerTemplate = function(payloadData) {
	const burger = findBurger(payloadData);
	const attachment = {
		attachment: {
			type: "template",
			payload: {
				template_type: "button",
				text:
					`Okay so, ${burger.title}, would you like the usual way or do you want to customize it?`,
				image_url: burger.image_url,
				buttons: [
					{
						type: "postback",
						title: "The Usual",
						payload: "USER_DEFINED_PAYLOAD"
					},
					{
						type: "postback",
						title: "Customize",
						payload: "USER_DEFINED_PAYLOAD"
					}
				]
			}
		}
	};
	return attachment
};


module.exports = {burgerTemplate};