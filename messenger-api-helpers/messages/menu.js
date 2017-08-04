const { menuItems } = require("./menuItems");


const burgerMenuTemplate = burgerObject => {
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
                        title: burgerObject.title
                    }
                })
            }
        ]
    };
};


const sideMenuTemplate = sideObject => {
    return {
        title: sideObject.title,
        image_url: sideObject.image_url,
        subtitle: sideObject.subtitle,
        buttons: [
            {
                type: "postback",
                title: "Order Burger",
                payload: JSON.stringify({
                    type: "show-side",
                    data: {
                        foodType: "side",
                        title: sideObject.title
                    }
                })
            }
        ]
    };
};




const menuMessage = {
    text: "Would you like to see our favourite burgers, standard burgers, or sides?",
    quick_replies: [
        {
            content_type: "text",
            title: "Our Favourites",
            payload: JSON.stringify({
                type: "see-special-burgers"
            })
        },
        {
            content_type: "text",
            title: "Normal Burgers",
            payload: JSON.stringify({
                type: "see-normal-burgers"
            })
        },
        {
            content_type: "text",
            title: "Sides",
            payload: JSON.stringify({
                type: "see-sides-menu"
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
                burgerMenuTemplate(menuItems[0]),
                burgerMenuTemplate(menuItems[1]),
                burgerMenuTemplate(menuItems[2]),
                burgerMenuTemplate(menuItems[3])
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
                burgerMenuTemplate(menuItems[4]),
                burgerMenuTemplate(menuItems[5]),
                burgerMenuTemplate(menuItems[6]),
                burgerMenuTemplate(menuItems[7])
            ]
        }
    }
};

const normalBurgerMenuMessageThree = {
    attachment: {
        type: "template",
        payload: {
            template_type: "list",
            top_element_style: "compact",
            elements: [
                burgerMenuTemplate(menuItems[8]),
                burgerMenuTemplate(menuItems[9])
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
                burgerMenuTemplate(menuItems[10]),
                burgerMenuTemplate(menuItems[11]),
                burgerMenuTemplate(menuItems[12]),
                burgerMenuTemplate(menuItems[13])
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
                burgerMenuTemplate(menuItems[14]),
                burgerMenuTemplate(menuItems[15]),
                burgerMenuTemplate(menuItems[16]),
                burgerMenuTemplate(menuItems[17])

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

const sideMenuMessage = {
    attachment: {
        type: "template",
        payload: {
            template_type: "list",
            top_element_style: "compact",
            elements: [
                sideMenuTemplate(menuItems[0]),
                sideMenuTemplate(menuItems[1]),
                sideMenuTemplate(menuItems[2]),
                sideMenuTemplate(menuItems[3])
            ]
        }
    }
};

module.exports = {
    menuMessage,
    specialBurgerMenuMessageOne,
    specialBurgerMenuMessageTwo,
    normalBurgerMenuMessageOne,
    normalBurgerMenuMessageTwo,
    normalBurgerMenuMessageThree
};