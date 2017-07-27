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
                    type: "order-item",
                    data: {
                        foodType: "burger"
                    }
                })
            }
        ]
    };
};


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
                {
                    title: "Double Hamburger (No Cheese)",
                    image_url: "http://i.imgur.com/6PnW8EE.jpg",
                    subtitle: "Two beef patties, on a sesame bun.",
                    buttons: [
                        {
                            type: "postback",
                            title: "Order Burger",
                            payload: JSON.stringify({
                                type: "order-item",
                                data: {
                                    foodType: "burger"

                                }
                            })
                        }
                    ]
                },
                {
                    title: "Double Cheeseburger",
                    image_url: "http://i.imgur.com/z7ANC0C.jpg",
                    subtitle: "Double cheese burger with caramelized onions.",
                    buttons: [
                        {
                            type: "postback",
                            title: "Order Burger",
                            payload: JSON.stringify({
                                type: "order-item",
                                data: {
                                    foodType: "burger"
                                }
                            })
                        }
                    ]
                },
                {
                    title: "Double Baconburger (No Cheese)",
                    image_url: "http://i.imgur.com/aUB3Mrd.jpg",
                    subtitle: "Two patties with bacon on a burger.",
                    buttons: [
                        {
                            type: "postback",
                            title: "Order Burger",
                            payload: JSON.stringify({
                                type: "order-item",
                                data: {
                                    foodType: "burger"
                                }
                            })
                        }
                    ]
                },
                {
                    title: "Double Bacon Cheeseburger",
                    image_url: "http://i.imgur.com/wySPVNs.jpg",
                    subtitle: "Two patties with bacon & cheese.",
                    buttons: [
                        {
                            type: "postback",
                            title: "Order Burger",
                            payload: JSON.stringify({
                                type: "order-item",
                                data: {
                                    foodType: "burger"
                                }
                            })
                        }
                    ]
                }
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
                {
                    title: "Top Bun",
                    image_url: "http://i.imgur.com/6PnW8EE.jpg",
                    subtitle:
                        "Two beef patties, fancy sauce, cheese, pickles, chopped lettuce, diced onion, served on a three part bun.",
                    buttons: [
                        {
                            type: "postback",
                            title: "Order Burger",
                            payload: JSON.stringify({
                                type: "order-item",
                                data: {
                                    foodType: "burger"
                                }
                            })
                        }
                    ]
                },
                {
                    title: "The Richmond",
                    image_url: "http://i.imgur.com/z7ANC0C.jpg",
                    subtitle:
                        "Double cheese burger with bacon & caramelized onions.",
                    buttons: [
                        {
                            type: "postback",
                            title: "Order Burger",
                            payload: JSON.stringify({
                                type: "order-item",
                                data: {
                                    foodType: "burger"
                                }
                            })
                        }
                    ]
                },
                {
                    title: "Breakfast At Tiffany's",
                    image_url: "http://i.imgur.com/aUB3Mrd.jpg",
                    subtitle:
                        "Double cheese burger with bacon, caramelized onions & a friend egg.",
                    buttons: [
                        {
                            type: "postback",
                            title: "Order Burger",
                            payload: JSON.stringify({
                                type: "order-item",
                                data: {
                                    foodType: "burger"
                                }
                            })
                        }
                    ]
                },
                {
                    title: "Varsity Blues",
                    image_url: "http://i.imgur.com/wySPVNs.jpg",
                    subtitle: "Two beef patties, bacon, & blue cheese.",
                    buttons: [
                        {
                            type: "postback",
                            title: "Order Burger",
                            payload: JSON.stringify({
                                type: "order-item",
                                data: {
                                    foodType: "burger"
                                }
                            })
                        }
                    ]
                }
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
                {
                    title: "Say Cheese",
                    image_url: "http://i.imgur.com/Jq4kO7S.jpg",
                    subtitle:
                        "Double cheeseburger, stuffed between two grilled cheese buns.",
                    buttons: [
                        {
                            type: "postback",
                            title: "Order Burger",
                            payload: JSON.stringify({
                                type: "order-item",
                                data: {
                                    foodType: "burger"
                                }
                            })
                        }
                    ]
                },
                {
                    title: "The Portobello",
                    image_url: "http://i.imgur.com/m4IQMAD.jpg",
                    subtitle:
                        "A Portobello stuffed with herbed cheese, rolled in panko crumbs & fried.",
                    buttons: [
                        {
                            type: "postback",
                            title: "Order Burger",
                            payload: JSON.stringify({
                                type: "order-item",
                                data: {
                                    foodType: "burger"
                                }
                            })
                        }
                    ]
                }
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
