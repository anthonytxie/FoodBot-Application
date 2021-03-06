const { menuItems, getCurrencyFromIntegerPrice } = require("./../../config/menuItems");

// ===== GENERAL MENU ===============================================================

const menuMessage = {
    text:
        "Would you like to see our special burgers, simple burgers, or sides?",
    quick_replies: [
        {
            content_type: "text",
            title: "Special Burgers",
            payload: JSON.stringify({
                type: "see-special-burgers"
            })
        },
        {
            content_type: "text",
            title: "Simple Burgers",
            payload: JSON.stringify({
                type: "see-normal-burgers"
            })
        },
        {
            content_type: "text",
            title: "Sides",
            payload: JSON.stringify({
                type: "see-sides"
            })
        }
    ]
};

// ===== MENU TEMPLATES ===============================================================

const specialBurgerMenuTemplate = burgerObject => {
    return {
        title: burgerObject.itemName,
        image_url: burgerObject.image_url,
        subtitle: burgerObject.subtitle,
        buttons: [
            {
                type: "postback",
                title: `Order $${getCurrencyFromIntegerPrice(burgerObject.basePrice)}`,
                payload: JSON.stringify({
                    type: "show-burger",
                    data: {
                        foodType: "burger",
                        itemName: burgerObject.itemName
                    }
                })
            }
        ]
    };
};

const normalBurgerMenuTemplate = burgerObject => {
    return {
        title: burgerObject.itemName,
        subtitle: burgerObject.subtitle,
        buttons: [
            {
                type: "postback",
                title: `Order $${getCurrencyFromIntegerPrice(burgerObject.basePrice)}`,
                payload: JSON.stringify({
                    type: "show-burger",
                    data: {
                        foodType: "burger",
                        itemName: burgerObject.itemName
                    }
                })
            }
        ]
    };
};

const sideMenuTemplate = sideObject => {
    return {
        title: sideObject.itemName,
        subtitle: sideObject.subtitle,
        buttons: [
            {
                type: "postback",
                title: `Order $${getCurrencyFromIntegerPrice(sideObject.basePrice)}`,
                payload: JSON.stringify({
                    type: "order-side",
                    data: {
                        foodObject: {
                            itemName: sideObject.itemName
                        }
                    }
                })
            }
        ]
    };
};

const normalBurgerMenuMessage = {
    attachment: {
        type: "template",
        payload: {
            template_type: "list",
            top_element_style: "compact",
            elements: [
                normalBurgerMenuTemplate(menuItems[0]),
                normalBurgerMenuTemplate(menuItems[1]),
                normalBurgerMenuTemplate(menuItems[2]),
                normalBurgerMenuTemplate(menuItems[3])
            ],
            buttons: [
                {
                    title: "Back to Menu",
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
                specialBurgerMenuTemplate(menuItems[10]),
                specialBurgerMenuTemplate(menuItems[11]),
                specialBurgerMenuTemplate(menuItems[12]),
                specialBurgerMenuTemplate(menuItems[13])
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
                specialBurgerMenuTemplate(menuItems[14]),
                specialBurgerMenuTemplate(menuItems[15]),
                specialBurgerMenuTemplate(menuItems[16]),
                specialBurgerMenuTemplate(menuItems[17])
            ],
            buttons: [
                {
                    title: "Back to Menu",
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
                sideMenuTemplate(menuItems[18]),
                sideMenuTemplate(menuItems[19]),
                sideMenuTemplate(menuItems[20]),
                sideMenuTemplate(menuItems[21])
            ],
            buttons: [
                {
                    title: "Back to Menu",
                    type: "postback",
                    payload: JSON.stringify({
                        type: "see-menu"
                    })
                }
            ]
        }
    }
};



// const specialBurgerGenericTemplate = burgerObject => {
//     return {
//         title: burgerObject.itemName,
//         image_url: burgerObject.image_url,
//         subtitle: burgerObject.subtitle,
//         buttons: [
//             {
//                 type: "postback",
//                 title: "Order Burger",
//                 payload: JSON.stringify({
//                     type: "show-burger",
//                     data: {
//                         foodType: "burger",
//                         title: burgerObject.itemName
//                     }
//                 })
//             },
//             {
//                 title: "Back to Menu",
//                 type: "postback",
//                 payload: JSON.stringify({
//                     type: "see-menu"
//                 })
//             }
//         ]
//     };
// };

// const specialBurgerMenuMessage = {
//     attachment: {
//         type: "template",
//         payload: {
//             template_type: "generic",

//             elements: [
//                 specialBurgerGenericTemplate(menuItems[10]),
//                 specialBurgerGenericTemplate(menuItems[11]),
//                 specialBurgerGenericTemplate(menuItems[12]),
//                 specialBurgerGenericTemplate(menuItems[13]),
//                 specialBurgerGenericTemplate(menuItems[14]),
//                 specialBurgerGenericTemplate(menuItems[15]),
//                 specialBurgerGenericTemplate(menuItems[16]),
//                 specialBurgerGenericTemplate(menuItems[17])
//             ]
//         }
//     }
// };


module.exports = {
    menuMessage,
    specialBurgerMenuMessageOne,
    specialBurgerMenuMessageTwo,
    normalBurgerMenuMessage,
    sideMenuMessage
};

