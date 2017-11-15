const mongoose = require("mongoose");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const itemDAO = require("./../db/DAO/itemDAO");
const userDAO = require("./../db/DAO/userDAO");
const sessionDAO = require("./../db/DAO/sessionDAO");
const orderDAO = require("./../db/DAO/orderDAO");
const linkDAO = require("./../db/DAO/linkDAO");
const { Item, Link, User, Session, Order } = require("./../db/models/index");
const { app } = require("./../server/index");
const request = require("supertest");
const sinon = require("sinon");
const pug = require("pug");
const send = require("./../messenger-api-helpers/send");

mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});
mongoose.Promise = global.Promise;
chai.use(chaiAsPromised);
chai.should();
chai.use(require("chai-things"));

const firstSenderId = "1577537135641765"; //anthony xie
const secondSenderId = "1615052901886719"; //isabelle leeson
let firstUserId;
let firstLinkId;
let secondLinkId;
let firstSessionId;
let secondSessionId;
let secondOrderId;
let firstSideNoComboId;
let firstBurgerNoComboId;

beforeEach(function(done) {
  this.timeout(15000);
  User.remove({})
    .then(() => {
      return Session.remove({});
    })
    .then(() => {
      return Order.remove({});
    })
    .then(() => {
      return Item.remove({});
    })
    .then(() => {
      return Link.remove({});
    })
    .then(() => {
      return userDAO.createUser(firstSenderId);
    })
    .then(user => {
      firstUserId = user._id;
      firstSessionId = user._sessions[0]._id;
      firstSessionActiveTime = user._sessions[0].lastActiveDate;
      return orderDAO.initializeOrder(firstSenderId, firstSessionId);
    })
    .then(order => {
      return sessionDAO.closeSession(firstSessionId);
    })
    .then(session => {
      return sessionDAO.renewSession(firstSenderId);
    })
    .then(session => {
      secondSessionId = session._id;
      return orderDAO.initializeOrder(firstSenderId, session._id);
    })
    .then(order => {
      return orderDAO.getLastOrderBySender(firstSenderId);
    })
    .then(order => {
      secondOrderId = order._id;
      return linkDAO.createNewLink();
    })
    .then(link => {
      firstLinkId = link._id;
      return itemDAO.postBurger(
        {
          _link: link._id,
          _order: secondOrderId,
          itemName: "The Portobello",
          standardToppings: ["Tomatoes", "Lettuce"],
          premiumToppings: ["Bacon"]
        },
        firstSenderId
      );
    })
    .then(burger => {
      return itemDAO.postSide(
        {
          _link: firstLinkId,
          _order: secondOrderId,
          itemName: "Poutine",
          itemCombo: true,
          itemSize: "Medium"
        },
        firstSenderId
      );
    })
    .then(side => {
      return itemDAO.postDrink(
        {
          _link: firstLinkId,
          _order: secondOrderId,
          itemName: "Vanilla Milkshake",
          itemCombo: true
        },
        firstSenderId
      );
    })
    .then(drink => {
      return linkDAO.createNewLink();
    })
    .then(link => {
      secondLinkId = link._id;
      return itemDAO.postBurger(
        {
          _link: link._id,
          _order: secondOrderId,
          itemName: "Chicken Chicken",
          standardToppings: ["Tomatoes", "Lettuce"],
          premiumToppings: ["Bacon", "Standard Cheese"]
        },
        firstSenderId
      );
    })
    .then(burger => {
      firstBurgerNoComboId = burger._id;
      return itemDAO.postDrink(
        {
          itemName: "Strawberry Milkshake"
        },
        firstSenderId
      );
    })
    .then(side => {
      firstSideNoComboId = side._id;
      return done();
    })
    .catch(err => console.log(err));
});

describe("USER DAO", () => {
  it("should return a new user and append isActive session", () => {
    let result = userDAO.createUser(secondSenderId);
    return Promise.all([
      result.should.eventually.have.property("_id"),
      result.should.eventually.have.property("PSID", "1615052901886719"),
      result.should.eventually.have.property("_sessions").that.has.length(1),
      result.should.eventually.have
        .property("_sessions")
        .that.has.property([0])
        .that.has.property("isActive", true)
    ]);
  });

  it("should return true for find function on existing user", () => {
    let trueResult = userDAO.isUserCreated(firstSenderId);
    let falseResult = userDAO.isUserCreated(secondSenderId);

    return Promise.all([
      trueResult.should.eventually.equal(true),
      falseResult.should.eventually.equal(false)
    ]);
  });

  it("should update e-mail for user", () => {
    let result = userDAO.updateEmail(firstUserId, "anthony112244@hotmail.com");

    return Promise.all([
      result.should.eventually.have.property("emails").that.has.length(1),
      result.should.eventually.have
        .property("emails")
        .that.has.property([0], "anthony112244@hotmail.com")
    ]);
  });

  it("should update phone number for user", () => {
    let result = userDAO.updatePhoneNumber(firstUserId, "(905) 257-4282");

    return Promise.all([
      result.should.eventually.have.property("phoneNumbers").that.has.length(1),
      result.should.eventually.have
        .property("phoneNumbers")
        .that.has.property([0], "(905) 257-4282")
    ]);
  });

  it("should update address and room number for user", () => {
    let result = userDAO.updateAddress(
      firstUserId,
      "25 Brentwood Crescent",
      ""
    );

    return Promise.all([
      result.should.eventually.have.property(
        "address",
        "25 Brentwood Crescent"
      ),
      result.should.eventually.have.property("roomNumber", "")
    ]);
  });
});

describe("Session DAO", () => {
  it("should return whether most recent session is active", () => {
    let result = sessionDAO.isSessionActive(firstSenderId);
    return Promise.all([
      result.should.eventually.be.true
      // should test a false version true
    ]);
  });

  it("should renew the most recent session and keep it active", () => {
    let result = sessionDAO.renewSession(firstSenderId);
    return Promise.all([
      result.should.eventually.have.property("_id"),
      result.should.eventually.have.property("isActive", true),
      result.should.eventually.have
        .property("lastActiveDate")
        .to.be.above(firstSessionActiveTime)
    ]);
  });

  it("should close the session", () => {
    let result = sessionDAO.closeSession(secondSessionId);
    return Promise.all([
      result.should.eventually.have.property("_id"),
      result.should.eventually.have.property("isActive", false)
    ]);
  });
  it("should renew the session and create a new one", () => {
    let result = sessionDAO.closeSession(secondSessionId);
    return result.then(session => {
      return Promise.all([
        sessionDAO
          .renewSession(firstSenderId)
          .should.eventually.have.property("isActive", true),
        sessionDAO
          .renewSession(firstSenderId)
          .should.eventually.have.property("_id")
          .not.equal(secondSessionId)
      ]);
    });
  });
});

describe("ORDER DAO", () => {
  it("should return initialize a new Order with session and user reference", () => {
    let thirdSessionId;
    let result = sessionDAO
      .closeSession(secondSessionId)
      .then(session => {
        return sessionDAO.renewSession(firstSenderId);
      })
      .then(thirdSessionId => {
        thirdSessionId = thirdSessionId;
        return orderDAO.initializeOrder(firstSenderId, thirdSessionId);
      })
      .then(order => {
        return order;
      });
    // eventually could make this better to check for _session and user PSID reference
    return Promise.all([
      result.should.eventually.have.deep.property("_session").that.is.not
        .undefined,
      result.should.eventually.have.deep.property("_user").that.is.not.undefined
    ]);
  });

  it("should find order by ID", () => {
    let result = orderDAO.findOrderById(secondOrderId);
    return Promise.all([
      result.should.eventually.have.deep.property("_id"),
      result.should.eventually.have.property("_items").that.has.length(5)
    ]);
  });

  it("should find order by sessionId", () => {
    let result = orderDAO.getOrderBySessionId(secondSessionId);
    return Promise.all([
      result.should.eventually.have.deep.property("_id"),
      result.should.eventually.have.property("_items").that.has.length(5)
    ]);
  });

  it("should find all incomplete/ not inputted orders", () => {
    let result = orderDAO.showIncompleteOrders();
    return Promise.all([result.should.eventually.have.length(0)]);
  });

  it("should confirm order", () => {
    let result = orderDAO.confirmOrder({
      orderId: secondOrderId,
      method: "pickup",
      time: Date.now(),
      isPaid: true,
      address: "330 phillip street",
      postal: "l6h7j4"
    });
    return Promise.all([
      result.should.eventually.have.property("_id"),
      result.should.eventually.have.property("methodFulfillment", "pickup"),
      result.should.eventually.have.property("fulfillmentDate"),
      result.should.eventually.have.property("isPaid", true),
      result.should.eventually.have.property("address", "330 phillip street"),
      result.should.eventually.have.property("postalCode", "l6h7j4"),
      result.should.eventually.have.property("orderConfirmDate")
    ]);
  });

  it("should update inputted order", () => {
    let result = orderDAO.updateInputtedOrder(secondOrderId, true);
    return Promise.all([
      result.should.eventually.have.property("_id"),
      result.should.eventually.have.property("isInputted", true),
      result.should.eventually.have.property("inputDate")
    ]);
  });

  it("should return paid order number", () => {
    let result = orderDAO.returnPaidOrderNumber();
    return result.should.eventually.equal("00001");
  });

  it("it should return all inputted orders", () => {
    let result = orderDAO.showInputtedOrderHistory();
    return result.should.eventually.have.length(0);
  });

  it("should get the most recent order by sender", () => {
    let result = orderDAO.getLastOrderBySender(firstSenderId);
    return result.should.eventually.have
      .property("_user")
      .that.has.property("PSID", "1577537135641765");
  });
});

describe("LINK DAO", () => {
  it("should create a new link", () => {
    let result = linkDAO.createNewLink();
    return result.should.eventually.have.property("_id");
  });
});

describe("ITEM DAO", () => {
  it("should add a new burger", () => {
    let result = linkDAO.createNewLink().then(link => {
      return itemDAO
        .postBurger(
          {
            _link: link._id,
            _order: secondOrderId,
            itemName: "Single Hambuger",
            Patties: 2,
            standardToppings: ["Tomatoes", "Lettuce"],
            premiumToppings: ["Bacon"]
          },
          firstSenderId
        )
        .then(burger => {
          return burger;
        });
    });
    return Promise.all([
      result.should.eventually.have.deep.property("_link").that.is.not
        .undefined,
      result.should.eventually.have.deep.property("_order").that.is.not
        .undefined,
      result.should.eventually.have.deep.property(
        "itemName",
        "Single Hambuger"
      ),
      result.should.eventually.have.deep.property("itemCombo").that.is.false,
      result.should.eventually.have.deep.property("Patties", 2)
    ]);
  });

  it("should update a burger", () => {
    let result = itemDAO
      .postBurger(
        {
          _link: firstLinkId,
          _order: secondOrderId,
          Patties: 2,
          standardToppings: ["Tomatoes", "Lettuce"],
          premiumToppings: ["Stuffed Portobello"]
        },
        firstSenderId
      )
      .then(burger => {
        return burger;
      });

    return Promise.all([
      result.should.eventually.have.deep.property("itemName", "The Portobello"),
      result.should.eventually.have.deep
        .property("premiumToppings")
        .that.has.property([0], "Stuffed Portobello")
    ]);
  });

  it("should add combo items", () => {
    let result = itemDAO
      .postSide(
        {
          _link: secondLinkId,
          _order: secondOrderId,
          itemName: "Poutine",
          itemSize: "Medium",
          itemCombo: true
        },
        firstSenderId
      )
      .then(side => {
        return itemDAO.postDrink(
          {
            _link: secondLinkId,
            _order: secondOrderId,
            itemName: "Strawberry Milkshake",
            itemCombo: true
          },
          firstSenderId
        );
      })
      .then(drink => {
        return drink;
      })
      .then(() => {
        return orderDAO.getLastOrderBySender(firstSenderId);
      });

    return Promise.all([
      result.should.eventually.have.deep.property("_id", secondOrderId),
      result.should.eventually.have.deep.property("_items").that.has.length(7),
      result.should.eventually.have.deep
        .property("_items")
        .that.has.property([5])
        .that.has.property("itemName", "Poutine"),
      result.should.eventually.have.deep
        .property("_items")
        .that.has.property([6])
        .that.has.property("itemName", "Strawberry Milkshake"),
      result.should.eventually.have.deep
        .property("_items")
        .that.has.property([5])
        .that.has.property("_link", secondLinkId),
      result.should.eventually.have.deep
        .property("_items")
        .that.has.property([6])
        .that.has.property("_link", secondLinkId),
      result.should.eventually.have.deep
        .property("_items")
        .that.has.property([5])
        .that.has.property("_order", secondOrderId),
      result.should.eventually.have.deep
        .property("_items")
        .that.has.property([6])
        .that.has.property("_order", secondOrderId)
    ]);
  });

  it("should update combo items", () => {
    let result = itemDAO
      .postSide(
        {
          _link: firstLinkId,
          _order: secondOrderId,
          itemName: "Fries",
          itemSize: "Medium",
          itemCombo: true
        },
        firstSenderId
      )
      .then(side => {
        return itemDAO.postDrink(
          {
            _link: firstLinkId,
            _order: secondOrderId,
            itemName: "Strawberry Milkshake",
            itemCombo: true
          },
          firstSenderId
        );
      })
      .then(drink => {
        return drink;
      })
      .then(() => {
        return orderDAO.getLastOrderBySender(firstSenderId);
      });

    return Promise.all([
      result.should.eventually.have.deep.property("_id", secondOrderId),
      result.should.eventually.have.deep.property("_items").that.has.length(5),
      result.should.eventually.have.deep
        .property("_items")
        .that.has.property([1])
        .that.has.property("itemName", "Fries"),
      result.should.eventually.have.deep
        .property("_items")
        .that.has.property([2])
        .that.has.property("itemName", "Strawberry Milkshake"),
      result.should.eventually.have.deep
        .property("_items")
        .that.has.property([1])
        .that.has.property("_link", firstLinkId),
      result.should.eventually.have.deep
        .property("_items")
        .that.has.property([2])
        .that.has.property("_link", firstLinkId),
      result.should.eventually.have.deep
        .property("_items")
        .that.has.property([1])
        .that.has.property("_order", secondOrderId),
      result.should.eventually.have.deep
        .property("_items")
        .that.has.property([2])
        .that.has.property("_order", secondOrderId)
    ]);
  });

  it("should remove combo items", () => {
    result = itemDAO
      .removeComboItems(firstSenderId, firstLinkId)
      .then(() => {
        return orderDAO.getLastOrderBySender(firstSenderId);
      })
      .then(order => {
        return order;
      });
    return result.should.eventually.have.deep
      .property("_items")
      .that.has.length(3);
  });

  it("should add a side item that is not inside a combo", () => {
    result = itemDAO
      .postSide(
        {
          itemName: "Fries",
          itemSize: "Medium",
          itemCombo: true
        },
        firstSenderId
      )
      .then(() => {
        return orderDAO.getLastOrderBySender(firstSenderId);
      })
      .then(order => {
        return order;
      });

    return result.should.eventually.have.deep
      .property("_items")
      .that.has.length(6);
  });

  it("should delete and item by ID", () => {
    result = itemDAO
      .deleteItemById(firstSideNoComboId, secondOrderId)
      .then(() => {
        return orderDAO.getLastOrderBySender(firstSenderId);
      })
      .then(order => {
        return order;
      });

    return result.should.eventually.have.deep
      .property("_items")
      .that.has.length(4);
  });
});

describe("COMBO, BURGER, CASHIER, AND DELETE ROUTES", function() {
  this.timeout(15000);

  it("should get burger customize", () => {
    let spy = sinon.spy(pug, "__express");
    return request(app)
      .get(
        `/burger?name=${"Top Bun"}&sender=${firstSenderId}&linkId=${secondLinkId}`
      )
      .expect(200)
      .then(() => {
        spy.calledWithMatch(/\/burger\.pug$/).should.be.true;
        spy.restore();
      });
  });

  it("should post a new burger", () => {
    let postBody = {
      _link: secondLinkId,
      title: "Single Cheeseburger",
      sender_id: firstSenderId,
      sendMessage: "1",
      Patties: "2",
      beef: "true",
      "Chicken Patty": "",
      "Sesame Bun": "true",
      "Lettuce Bun": "",
      "Gluten Free Bun": "",
      "Grilled Cheese Bun": "",
      Ketchup: "",
      Mayo: "",
      Mustard: "",
      Relish: "",
      "Fancy Sauce": "true",
      "Hot Sauce": "",
      Lettuce: "true",
      Tomatoes: "",
      Pickles: "true",
      Onions: "true",
      "Hot Peppers": "",
      Bacon: "",
      "Standard Cheese": "",
      "American Cheese": "",
      "Blue Cheese": "",
      "Caramelized Onions": "",
      "Sauteed Mushrooms": "true",
      "Stuffed Portobello": "",
      "Cheese Sauce": "",
      "Side of Gravy": ""
    };
    let stub = sinon.stub(send, "sendOrderedBurgerUpsizeMessage");
    return request(app)
      .post("/burger")
      .send(postBody)
      .then(res => {
        res.status.should.equal(200);
        stub.called.should.be.true;
        stub.restore();
      })
      .then(res => {
        return orderDAO
          .getLastOrderBySender(firstSenderId)
          .should.eventually.have.property("_items")
          .that.has.property([3])
          .that.has.property("standardToppings")
          .that.has.length(5);
      });
  });

  it("should post to /combo and send confirm message", () => {
    let stub = sinon.stub(send, "sendOrderedMessage");
    let postBody = {
      _link: firstLinkId,
      sender_id: firstSenderId,
      sendMessage: "1",
      food_type: "Fries",
      drink_type: "milkshake",
      milkshake_flavor: "strawberry",
      soda_flavor: ""
    };
    return request(app)
      .post("/combo")
      .send(postBody)
      .then(res => {
        res.status.should.equal(200);
        stub.called.should.be.true;
        stub.restore();
      })
      .then(() => {
        return Promise.all([
          orderDAO
            .getLastOrderBySender(firstSenderId)
            .should.eventually.have.deep.property("_items")
            .that.has.length(5),
          orderDAO
            .getLastOrderBySender(firstSenderId)
            .should.eventually.have.deep.property("_items")
            .that.has.property([2])
            .that.has.property("itemName", "Strawberry Milkshake")
        ]);
      });
  });

  it("should get render receipt", () => {
    let spy = sinon.spy(pug, "__express");
    return request(app)
      .get(`/receipt?senderId=${firstSenderId}`)
      .expect(200)
      .then(() => {
        spy.calledWithMatch(/\/receipt\.pug$/).should.be.true;
        spy.restore();
      });
  });

  it("should delete items when posting to /delete", () => {
    let postBody = {
      orderId: secondOrderId,
      itemIds: [firstSideNoComboId, firstBurgerNoComboId]
    };
    return request(app)
      .post("/delete")
      .send(postBody)
      .then(res => {
        res.status.should.equal(200);
      })
      .then(() => {
        return Promise.all([
          orderDAO
            .getLastOrderBySender(firstSenderId)
            .should.eventually.have.property("_items")
            .that.has.length(3)
        ]);
      });
  });

  it("should render cashier view", () => {
    let spy = sinon.spy(pug, "__express");
    return request(app)
      .get(`/cashier`)
      .expect(200)
      .then(() => {
        spy.calledWithMatch(/\/cashier\.pug$/).should.be.true;
        spy.restore();
      });
  });

  it("should get orderId", () => {
    return request(app)
      .get(`/getorder/${secondOrderId}`)
      .then(res => {
        res.status.should.equal(200);
      });
  });
});

describe("RECEIPT ROUTES", function() {
  this.timeout(15000);

  it("should confirm order with pay for delivery", () => {
    let stub = sinon.stub(send, "sendConfirmPaidMessageDelivery");
    let postBody = {
      orderId: secondOrderId,
      method: "delivery",
      address: "330 phillip street",
      postal: "l9t2x5",
      authorized_payment: "1192",
      token_id: "tok_visa",
      token_email: "anthony112244@hotmail.com",
      phoneNumber: "(905) 257-4282"
    };
    return request(app)
      .post("/confirm")
      .send(postBody)
      .then(res => {
        return res.status.should.equal(200);
        stub.called.should.be.true;
        stub.restore();
      })
      .then(() => {
        return Promise.all([
          orderDAO
            .getLastOrderBySender(firstSenderId)
            .should.eventually.have.property("isPaid", true),
          orderDAO
            .getLastOrderBySender(firstSenderId)
            .should.eventually.have.property("isConfirmed", true),
          orderDAO
            .getLastOrderBySender(firstSenderId)
            .should.eventually.have.property("methodFulfillment", "delivery")
        ]);
      });
  });

  it("should confirm order with pay for pickup", () => {
    let stub = sinon.stub(send, "sendConfirmPaidMessagePickup");
    let postBody = {
      orderId: secondOrderId,
      method: "pickup",
      address: "",
      postal: "",
      authorized_payment: "1192",
      token_id: "tok_visa",
      token_email: "anthony112244@hotmail.com",
      phoneNumber: ""
    };
    return request(app)
      .post("/confirm")
      .send(postBody)
      .then(res => {
        return res.status.should.equal(200);
        stub.called.should.be.true;
        stub.restore();
      })
      .then(() => {
        return Promise.all([
          orderDAO
            .getLastOrderBySender(firstSenderId)
            .should.eventually.have.property("isPaid", true),
          orderDAO
            .getLastOrderBySender(firstSenderId)
            .should.eventually.have.property("isConfirmed", true),
          orderDAO
            .getLastOrderBySender(firstSenderId)
            .should.eventually.have.property("methodFulfillment", "pickup")
        ]);
      });
  });

  it("should confirm order without pay for pick-up", () => {
    let stub = sinon.stub(send, "sendConfirmUnpaidMessagePickup");
    let postBody = {
      orderId: secondOrderId,
      method: "pickup",
      address: "",
      postal: "",
      time: '"2017-08-14T01:18:00.000Z"',
      room: "",
      authorized_payment: "1192"
    };
    return request(app)
      .post("/confirm")
      .send(postBody)
      .then(res => {
        res.status.should.equal(200);
        stub.called.should.be.true;
        stub.restore();
      })
      .then(() => {
        return Promise.all([
          orderDAO
            .findOrderById(secondOrderId)
            .should.eventually.have.property("isConfirmed", true),
          orderDAO
            .findOrderById(secondOrderId)
            .should.eventually.have.property("methodFulfillment", "pickup"),
          orderDAO
            .findOrderById(secondOrderId)
            .should.eventually.have.property("isPaid", false),
          orderDAO
            .findOrderById(secondOrderId)
            .should.eventually.have.property("fulfillmentDate"),
          orderDAO
            .findOrderById(secondOrderId)
            .should.eventually.have.property("orderConfirmDate")
        ]);
      });
  });

  it("should confirm order without pay for delivery", () => {
    let stub = sinon.stub(send, "sendConfirmUnpaidMessageDelivery");
    let postBody = {
      orderId: secondOrderId,
      method: "delivery",
      address: "330 phillip street",
      postal: "l9t2x5",
      time: '"2017-08-14T01:18:00.000Z"',
      room: "",
      authorized_payment: "1192"
    };
    return request(app)
      .post("/confirm")
      .send(postBody)
      .then(res => {
        res.status.should.equal(200);
        stub.called.should.be.true;
        stub.restore();
      })
      .then(() => {
        return Promise.all([
          orderDAO
            .findOrderById(secondOrderId)
            .should.eventually.have.property("isConfirmed", true),
          orderDAO
            .findOrderById(secondOrderId)
            .should.eventually.have.property("methodFulfillment", "delivery"),
          orderDAO
            .findOrderById(secondOrderId)
            .should.eventually.have.property("isPaid", false),
          orderDAO
            .findOrderById(secondOrderId)
            .should.eventually.have.property("fulfillmentDate"),
          orderDAO
            .findOrderById(secondOrderId)
            .should.eventually.have.property("orderConfirmDate")
        ]);
      });
  });
});

describe("POST /WEBHOOK", function() {
  this.timeout(15000);
});
