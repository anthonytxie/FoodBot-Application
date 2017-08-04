const { normalBurgers, specialBurgers } = require("./burgers");
const { sides }  = require('./sides');


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
                burgerMenuTemplate(normalBurgers[5])
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

const sideMenuMessage = {
    attachment: {
        type: "template",
        payload: {
            template_type: "list",
            top_element_style: "compact",
            elements: [
                sideMenuTemplate(sides[0]),
                sideMenuTemplate(sides[1]),
                sideMenuTemplate(sides[2]),
                sideMenuTemplate(sides[3])
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