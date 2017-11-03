const {
    menuMessage,
    specialBurgerMenuMessage,
    normalBurgerMenuMessage,
    sideMenuMessage
} = require("./menu");

const websiteURL = process.env.websiteURL;

const { burgerTemplate } = require("./itemTemplate");

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
        type: "create-new-order"
    })
};

const editOrderButton = {
    type: "postback",
    title: "Edit Order",
    payload: JSON.stringify({
        type: "edit-order"
    })
};


const persistentMenu = {
    persistent_menu: [{
        locale: "default",
        composer_input_disabled: true,
        call_to_actions: [seeMenuButton, newOrderButton, editOrderButton]
    }]
};

// ===== GETTING STARTED ===============================================================

const getStarted = {
    get_started: {
        payload: JSON.stringify({
            type: "initialize"
        })
    }
};

const welcomeMessage = {
    attachment: {
        type: "template",
        payload: {
            template_type: "button",
            text: `Hey :)\n\nWelcome to Burger Burger! To see what we have cooking view our Menu! To order, just tap order.`,
            buttons: [{
                type: "postback",
                title: "Order",
                payload: JSON.stringify({
                    type: "see-menu"
                })
            }]
        }
    }
};

// ===== ORDERS ===============================================================

const upsizeOrderMessage = (senderId, linkId) => {
    const attachment = {
        attachment: {
            type: "template",
            payload: {
                template_type: "button",
                text: "Would you like to make that a combo? (Fries & Drink)",
                buttons: [{
                        type: "web_url",
                        url: `${websiteURL}/burgercombo?linkId=${linkId}&sender=${senderId}`,
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

const orderAskContinue = (package) => {
    const attachment = {
        attachment: {
            type: "template",
            payload: {
                template_type: "button",
                text: "Alright, that sounds great! Are you done or would you like to order more?",
                buttons: [{
                        type: "postback",
                        title: "Order More",
                        payload: JSON.stringify({
                            type: "see-menu"
                        })
                    },
                    {
                        type: "web_url",
                        url: `${websiteURL}/receipt?order=${package._order}`,
                        title: "Done",
                        webview_height_ratio: "full",
                        messenger_extensions: true
                    }
                ]
            }
        }
    };
    return attachment;
};

const editOrder = (recipientId, order) => {
    const attachment = {
        attachment: {
            type: "template",
            payload: {
                template_type: "button",
                text: "Would you like to remove a few items from your order?",
                buttons: [{
                        type: "web_url",
                        url: `${websiteURL}/editorder?order=${order._id}&sender=${recipientId}`,
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


const emptyOrderMessage = (recipientId) => {
    const attachment = {
        attachment: {
            type: "template",
            payload: {
                template_type: "button",
                text: "Hey! You haven't ordered anything yet. Tap the button to see the menu.",
                buttons: [{
                    type: "postback",
                    title: "See Menu",
                    payload: JSON.stringify({
                        type: "see-menu"
                    })
                }, ]
            }
        }
    };
    return attachment;
};

const nextOrderMessage = (recipientId) => {
    const attachment = {
        attachment: {
            type: "template",
            payload: {
                template_type: "button",
                text: "Thanks for ordering with us. To message us again next time hit the New Order Button!",
                buttons: [{
                    type: "postback",
                    title: "New Order",
                    payload: JSON.stringify({
                        type: "see-menu"
                    })
                }, ]
            }
        }
    };
    return attachment;
}

const newOrderMessage = (recipientId) => {
    const attachment = {
        attachment: {
            type: "template",
            payload: {
                template_type: "button",
                text: "That order has already been confirmed. Hit the button to create a new order!",
                buttons: [{
                    type: "postback",
                    title: "New Order",
                    payload: JSON.stringify({
                        type: "create-new-order"
                    })
                }, ]
            }
        }
    };
    return attachment;
}



// ===== ITEMS ===============================================================

const askFriesSizeMessage = () => {
    return {
        text: "Would you like Medium Fries ($3.99) or Large Fries ($4.99)?",
        quick_replies: [{
                content_type: "text",
                title: "Medium",
                payload: JSON.stringify({
                    type: "order-Fries",
                    data: {
                        foodObject: {
                            itemName: "Fries",
                            itemSize: "Medium"
                        }
                    }
                })
            },
            {
                content_type: "text",
                title: "Large",
                payload: JSON.stringify({
                    type: "order-Fries",
                    data: {
                        foodObject: {
                            itemName: "Fries",
                            itemSize: "Large"
                        }
                    }
                })
            }
        ]
    };
};

const askMilkshakeFlavorMessage = () => {
    return {
        text: "Would you like vanilla, chocolate, or strawberry?",
        quick_replies: [{
                content_type: "text",
                title: "Vanilla",
                payload: JSON.stringify({
                    type: "order-shake",
                    data: {
                        foodObject: {
                            itemName: "Vanilla Milkshake"
                        }
                    }
                })
            },
            {
                content_type: "text",
                title: "Chocolate",
                payload: JSON.stringify({
                    type: "order-shake",
                    data: {

                        foodObject: {
                            itemName: "Chocolate Milkshake"
                        }
                    }
                })
            },
            {
                content_type: "text",
                title: "Strawberry",
                payload: JSON.stringify({
                    type: "order-shake",
                    data: {

                        foodObject: {
                            itemName: "Strawberry Milkshake"
                        }
                    }
                })
            }
        ]
    };
};

const comboErrorMessage = {
    text: "We're sorry. You can't order combo items without order a burger first. See burgers here:",
    quick_replies: [{
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
        }
    ]
};






module.exports = {
    messageTemplate,
    persistentMenu,
    getStarted,
    welcomeMessage,
    menuMessage,
    specialBurgerMenuMessage,
    normalBurgerMenuMessage,
    sideMenuMessage,
    burgerTemplate,
    upsizeOrderMessage,
    orderAskContinue,
    editOrder,
    emptyOrderMessage,
    nextOrderMessage,
    newOrderMessage,
    askFriesSizeMessage,
    askMilkshakeFlavorMessage,
    comboErrorMessage
};