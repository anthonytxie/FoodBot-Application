const { normalBurgers, specialBurgers } = require('./burgers')

const burgerMenuTemplate = (burgerObject) => {
    return {
        title: burgerObject.title,
        image_url: burgerObject.image_url,
        subtitle: burgerObject.subtitle,
        buttons: [
            {
                type: "postback",
                title: "Order Burger",
                payload: JSON.stringify({
                    type: "show-burger",
                    data: {
                        foodType: "burger",
                        title: burgerObject.title,
                        foodObject: burgerObject.burgerObject
                    }
                })
            }
        ]
    };
};
console.log(...normalBurgers[0].burgerObject.standardToppings)
const menuMessage = {
    text: "Would you like to see our Special Burgers or Normal Burgers?",
    quick_replies: [
        {
            content_type: "text",
            title: "Specials",
            payload: JSON.stringify({
                type: "see-special-burgers"
            })
        },
        {
            content_type: "text",
            title: "Burgers",
            payload: JSON.stringify({
                type: "see-normal-burgers"
            })
        }
    ]
};

const normalBurgerMenuMessageOne = {
    attachment: {
        type: "template",
        payload: {
            template_type: "list",
            top_element_style: "compact",
            elements: [
                burgerMenuTemplate(normalBurgers[0]),
                burgerMenuTemplate(normalBurgers[1]),         
                burgerMenuTemplate(normalBurgers[2]),         
                burgerMenuTemplate(normalBurgers[3])       
            ]
        }
    }
};

const normalBurgerMenuMessageTwo = {
    attachment: {
        type: "template",
        payload: {
            template_type: "list",
            top_element_style: "compact",
            elements: [
                burgerMenuTemplate(normalBurgers[4]),
                burgerMenuTemplate(normalBurgers[5]),
            ],
            buttons: [
                {
                    title: "View More",
                    type: "postback",
                    payload: JSON.stringify({
                        type: "see-menu"
                    })
                }
            ]
        }
    }
};

const specialBurgerMenuMessageOne = {
    attachment: {
        type: "template",
        payload: {
            template_type: "list",
            top_element_style: "compact",
            elements: [
                burgerMenuTemplate(specialBurgers[0]),
                burgerMenuTemplate(specialBurgers[1]),
                burgerMenuTemplate(specialBurgers[2]),
                burgerMenuTemplate(specialBurgers[3])
            ]
        }
    }
};

const specialBurgerMenuMessageTwo = {
    attachment: {
        type: "template",
        payload: {
            template_type: "list",
            top_element_style: "compact",
            elements: [
                burgerMenuTemplate(specialBurgers[4]),
                burgerMenuTemplate(specialBurgers[5])
            ],
            buttons: [
                {
                    title: "View More",
                    type: "postback",
                    payload: JSON.stringify({
                        type: "see-menu"
                    })
                }
            ]
        }
    }
};

module.exports = {
    menuMessage,
    specialBurgerMenuMessageOne,
    specialBurgerMenuMessageTwo,
    normalBurgerMenuMessageOne,
    normalBurgerMenuMessageTwo
};
