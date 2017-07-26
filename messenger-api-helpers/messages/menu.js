const menuMessage = {
    text: "We have Burgers, Sides, and Drinks. What would you like to see?",
    quick_replies: [
        {
            content_type: "text",
            title: "Burgers",
            payload: JSON.stringify({
                type: "see-burgers"
            })
        },
        {
            content_type: "text",
            title: "Fries",
            payload: JSON.stringify({
                type: "see-fries"
            })
        },
        {
            content_type: "text",
            title: "Drinks",
            payload: JSON.stringify({
                type: "see-drinks"
            })
        }
    ]
};

const burgerMenuMessage = {
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
            ],
            buttons: [
                {
                    title: "View More",
                    type: "postback",
                    payload: "payload"
                }
            ]
        }
    }
};

module.exports = { menuMessage, burgerMenuMessage };
