const { menuItems } = require("./menuItems");

// ===== GENERAL MENU ===============================================================

const menuMessage = {
    text:
        "Would you like to see our favourite burgers, standard burgers, or sides?",
    quick_replies: [
        {
            content_type: "text",
            title: "Favorites",
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
        title: burgerObject.title,
        image_url: burgerObject.image_url,
        subtitle: burgerObject.subtitle,
        buttons: [
            {
                type: "postback",
                title: `Order $${burgerObject.basePrice}`,
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

const normalBurgerMenuTemplate = burgerObject => {
    return {
        title: burgerObject.title,
        subtitle: burgerObject.subtitle,
        buttons: [
            {
                type: "postback",
                title: `Order $${burgerObject.basePrice}`,
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
        subtitle: sideObject.subtitle,
        buttons: [
            {
                type: "postback",
                title: `Order $${sideObject.basePrice}`,
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
//         title: burgerObject.title,
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
//                         title: burgerObject.title
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

