const mongoose = require("mongoose");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const itemDAO = require("./../db/DAO/itemDAO");
const userDAO = require("./../db/DAO/userDAO");
const sessionDAO = require("./../db/DAO/sessionDAO");
const orderDAO = require("./../db/DAO/orderDAO");
const { Item, User, Session, Order } = require("./../db/models/index");
const { app } = require("./../server/index");
const request = require("supertest");
const sinon = require("sinon");
const pug = require("pug");
const send = require("./../messenger-api-helpers/send");




mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});mongoose.Promise = global.Promise;
chai.use(chaiAsPromised);
chai.should();
chai.use(require("chai-things"));


let userId;
let firstSessionId;
let secondSessionId;
let PSID;
let orderId;
let itemId;
let testBurger = {
  patties: 2,
  itemName: "Top Bun",
  premiumToppings: ["threePartBun", "standardCheese"],
  standardToppings: ["fancySauce", "pickles", "lettuce", "onions"]
};

let testDrink = {
  itemName: "vanillaMilkshake",
  itemCombo: false
};
let testSide = {
  itemName: "poutine",
  itemCombo: false
};
let testComboDrink = {
  itemName: "vanillaMilkshake",
  itemCombo: true
};
let testComboSide = {
  itemName: "poutine",
  itemCombo: true,
  itemSize: "medium"
};
beforeEach(done => {
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
      return userDAO.createUser(12345);
    })
    .then(user => {
      userId = user._id;
      firstSessionId = user._sessions[0]._id;
      firstSessionActiveTime = user._sessions[0].lastActiveDate;
      PSID = user.PSID;
      return orderDAO.initializeOrder(PSID, firstSessionId);
    })
    .then(order => {
      orderId = order._id;
      return sessionDAO.closeSession(firstSessionId);
    })
    .then(session => {
      return sessionDAO.renewSession(PSID);
    })
    .then(session => {
      secondSessionId = session._id;
      return itemDAO.postSide(testSide, orderId);
    })
    .then(order => {
      itemId = order._items[0]._id;
      return done();
    });
});

describe("USER DAO", () => {
  it("should return a new user and append isActive session", () => {
    let result = userDAO.createUser(12341234);
    return Promise.all([
      result.should.eventually.have.property("_id"),
      result.should.eventually.have.property("PSID", "12341234"),
      result.should.eventually.have.property("_sessions").that.has.length(1),
      result.should.eventually.have
        .property("_sessions")
        .that.has.property([0])
        .that.has.property("isActive", true)
    ]);
  });

  it("should return true for find function on existing user", () => {
    let trueResult = userDAO.isUserCreated(12345);
    let falseResult = userDAO.isUserCreated(123456);

    return Promise.all([
      trueResult.should.eventually.equal(true),
      falseResult.should.eventually.equal(false)
    ]);
  });

  it("should update e-mail for user", () => {
    let result = userDAO.updateEmail(userId, "anthony112244@hotmail.com");

    return Promise.all([
      result.should.eventually.have.property("emails").that.has.length(1),
      result.should.eventually.have
        .property("emails")
        .that.has.property([0], "anthony112244@hotmail.com")
    ]);
  });
});

describe("Session DAO", () => {
  it("should return whether most recent session is active", () => {
    let result = sessionDAO.isSessionActive(PSID);
    return Promise.all([
      result.should.eventually.be.true
      // should test a false version true
    ]);
  });

  it("should renew the most recent session and keep it active", () => {
    let result = sessionDAO.renewSession(PSID);
    return Promise.all([
      result.should.eventually.have.property("_id"),
      result.should.eventually.have.property("isActive", true),
      result.should.eventually.have
        .property("lastActiveDate")
        .to.be.above(firstSessionActiveTime)
    ]);
  });

  it("should close the session", () => {
    let result = sessionDAO.closeSession(firstSessionId);
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
          .renewSession(PSID)
          .should.eventually.have.property("isActive", true),
        sessionDAO
          .renewSession(PSID)
          .should.eventually.have.property("_id")
          .not.equal(secondSessionId)
      ]);
    });
  });
});

describe("ORDER DAO", () => {
  it("should return initialize a new Order with session and user reference", () => {
    let result = orderDAO.initializeOrder(PSID, firstSessionId);
    return Promise.all([
      result.should.eventually.have.property("_id"),
      result.should.eventually.have.property("isConfirmed", false),
      result.should.eventually.have.property("isPaid", false),
      result.should.eventually.have.property("_session", firstSessionId),
      result.should.eventually.have.property("_user") // weird bug here
    ]);
  });

  it("should find order by ID", () => {
    let result = orderDAO.findOrderById(orderId);
    return Promise.all([
      result.should.eventually.have.deep.property("_id"),
      result.should.eventually.have.property("_items").that.has.length(1)
    ]);
  });

  it("should find order by sessionId", () => {
    let result = orderDAO.getOrderBySessionId(firstSessionId);
    return Promise.all([
      result.should.eventually.have.deep.property("_id"),
      result.should.eventually.have.property("_items").that.has.length(1)
    ]);
  });

  it("should find all incomplete orders", () => {
    let result = orderDAO.showIncompleteOrders();
    return Promise.all([result.should.eventually.have.length(0)]);
  });

  it("should confirm order", () => {
    let result = orderDAO.confirmOrder({
      orderId: orderId,
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
    let result = orderDAO.updateInputtedOrder(orderId);
    return Promise.all([
      result.should.eventually.have.property("_id"),
      result.should.eventually.have.property("isInputted", true),
      result.should.eventually.have.property("inputDate")
    ]);
  });
});

describe("ITEM DAO", () => {
  it("should add a burger to the order", () => {
    let result = itemDAO.postBurger(testBurger, orderId);
    return Promise.all([
      result.should.eventually.have.property("_items").that.has.length(2),
      result.should.eventually.have
        .property("_items")
        .that.has.property([1])
        .that.has.property("itemName", testBurger.itemName),
      result.should.eventually.have
        .property("_items")
        .that.has.property([1])
        .that.has.property("patties", 2),
      result.should.eventually.have
        .property("_items")
        .that.has.property([1])
        .that.has.property("standardToppings")
        .to.include.deep.members(testBurger.standardToppings),
      result.should.eventually.have
        .property("_items")
        .that.has.property([1])
        .that.has.property("premiumToppings")
        .to.include.deep.members(testBurger.premiumToppings),
      result.should.eventually.have
        .property("_items")
        .that.has.property([1])
        .that.has.property("itemType")
        .to.equal("burger")
    ]);
  });

  it("should add a drink to the order", () => {
    let result = itemDAO.postDrink(testDrink, orderId);
    return Promise.all([
      result.should.eventually.have.property("_items").that.has.length(2),
      result.should.eventually.have
        .property("_items")
        .that.has.property([1])
        .that.has.property("itemName", testDrink.itemName),
      result.should.eventually.have
        .property("_items")
        .that.has.property([1])
        .that.has.property("itemCombo", false)
    ]);
  });

  it("should add a side to the order", () => {
    let result = itemDAO.postSide(testSide, orderId);
    return Promise.all([
      result.should.eventually.have.property("_items").that.has.length(2),
      result.should.eventually.have
        .property("_items")
        .that.has.property([1])
        .that.has.property("itemName", testSide.itemName),
      result.should.eventually.have
        .property("_items")
        .that.has.property([1])
        .that.has.property("itemCombo", false)
    ]);
  });

  it("should not add a combo drink to the order", () => {
    let result = itemDAO.postDrink(testComboDrink, orderId);
    return Promise.all([result.should.eventually.be.false]);
  });

  it("should not add not a combo drink to the order", () => {
    let result = itemDAO.postSide(testComboSide, orderId);
    return Promise.all([result.should.eventually.be.false]);
  });

  it("should add a combo drink to the order", () => {
    let result = itemDAO.postBurger(testBurger, orderId);
    return result.then(order => {
      return Promise.all([
        itemDAO
          .postDrink(testComboDrink, orderId)
          .should.eventually.have.property("_items")
          .that.has.length.above(2),
        itemDAO
          .postDrink(testComboDrink, orderId)
          .should.eventually.have.property("_items")
          .that.has.property([2])
          .that.has.property("itemName", testComboDrink.itemName),
        itemDAO
          .postDrink(testComboDrink, orderId)
          .should.eventually.have.property("_items")
          .that.has.property([2])
          .that.has.property("itemCombo", testComboDrink.itemCombo),
        itemDAO
          .postDrink(testComboDrink, orderId)
          .should.eventually.have.property("_items")
          .that.has.property([2])
          .that.has.property("itemCombo", testComboDrink.itemCombo)
      ]);
    });
  });
  it("should add a combo side to the order", () => {
    let result = itemDAO.postBurger(testBurger, orderId);
    return result
      .then(order => {
        return itemDAO.postDrink(testComboDrink, orderId);
      })
      .then(order => {
        return Promise.all([
          itemDAO
            .postSide(testComboSide, orderId)
            .should.eventually.have.property("_items")
            .that.has.length.above(3),
          itemDAO
            .postSide(testComboSide, orderId)
            .should.eventually.have.property("_items")
            .that.has.property([3])
            .that.has.property("itemName", testComboSide.itemName),
          itemDAO
            .postSide(testComboSide, orderId)
            .should.eventually.have.property("_items")
            .that.has.property([3])
            .that.has.property("itemCombo", testComboSide.itemCombo)
        ]);
      });
  });

  it("should delete item by ID", () => {
    let result = itemDAO.deleteItemById(itemId, orderId);
    return Promise.all([
      result.should.eventually.have.property("_items").that.has.length(0)
    ]);
  });
});

describe("ROUTES", () => {
  it("should get burger customize", () => {
    let spy = sinon.spy(pug, "__express");
    return request(app)
      .get("/burgercustomize?order=${orderId}&name=Top+Bun&sender=${PSID}")
      .expect(200)
      .then(() => {
        spy.calledWithMatch(/\/burgercustomize\.pug$/).should.be.true;
        spy.restore();
      });
  });

  it("should post a new burger", () => {
    let postBody = {
      order_id: orderId,
      title: "Swiss Bank Account",
      sender_id: PSID,
      patties: "2",
      beef: "true",
      chickenPatty: "",
      standardBun: "true",
      lettuceBun: "",
      glutenFreeBun: "",
      grilledCheeseBun: "",
      ketchup: "",
      mayo: "",
      mustard: "",
      relish: "",
      fancySauce: "",
      hotSauce: "",
      lettuce: "",
      tomatoes: "",
      pickles: "",
      onions: "",
      hotPepper: "",
      bacon: "",
      standardCheese: "",
      americanCheese: "",
      blueCheese: "",
      caramelizedOnions: "",
      sauteedMushrooms: "true",
      stuffedPortobello: "",
      cheeseSauce: "",
      gravySide: ""
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
          .findOrderById(orderId)
          .should.eventually.have.property("_items")
          .that.has.property([1])
          .that.has.property("itemName")
          .that.equals("Swiss Bank Account");
      });
  });
  it("should get render customize", () => {
    let spy = sinon.spy(pug, "__express");
    return request(app)
      .get("/burgercombo?order=${orderId}&sender=${senderId}")
      .expect(200)
      .then(() => {
        spy.calledWithMatch(/\/burgercombopage\.pug$/).should.be.true;
        spy.restore();
      });
  });
  it("should post to /combo and send error message", () => {
    let stub = sinon.stub(send, "sendComboError");
    let postBody = {
      order_id: orderId,
      sender_id: PSID,
      food_type: "fries",
      drink_type: "milkshake",
      milkshake_flavor: "strawberry",
      soda_flavor: ""
    };
    return request(app).post("/combo").send(postBody).then(res => {
      res.status.should.equal(200);
      stub.called.should.be.true;
      stub.restore();
    });
  });

  it("should post to /combo and send confirm message", () => {
    let stub = sinon.stub(send, "sendOrderedMessage");
    let postBody = {
      order_id: orderId,
      sender_id: PSID,
      food_type: "fries",
      drink_type: "milkshake",
      milkshake_flavor: "strawberry",
      soda_flavor: ""
    };
    return itemDAO.postBurger(testBurger, orderId).then(() => {
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
              .findOrderById(orderId)
              .should.eventually.have.property("_items")
              .that.has.length(4),
            orderDAO
              .findOrderById(orderId)
              .should.eventually.have.property("_items")
              .that.has.property([2])
              .that.has.property("itemName", "strawberryMilkshake"),
            orderDAO
              .findOrderById(orderId)
              .should.eventually.have.property("_items")
              .that.has.property([3])
              .that.has.property("itemName", "fries"),
            orderDAO
              .findOrderById(orderId)
              .should.eventually.have.property("_items")
              .that.has.property([3])
              .that.has.property("itemSize", "medium")
          ]);
        });
    });
  });

  it("should get render receipt", () => {
    let spy = sinon.spy(pug, "__express");
    return request(app)
      .get(`/receipt?order=${orderId}`)
      .expect(200)
      .then(() => {
        spy.calledWithMatch(/\/receipt\.pug$/).should.be.true;
        spy.restore();
      });
  });
  it("should confirm order without pay for pick-up", () => {
    let stub = sinon.stub(send, "sendConfirmUnpaidMessagePickup");
    let postBody = {
      orderId: orderId,
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
            .findOrderById(orderId)
            .should.eventually.have.property("isConfirmed", true),
          orderDAO
            .findOrderById(orderId)
            .should.eventually.have.property("methodFulfillment", "pickup"),
          orderDAO
            .findOrderById(orderId)
            .should.eventually.have.property("isPaid", false),
          orderDAO
            .findOrderById(orderId)
            .should.eventually.have.property("fulfillmentDate"),
          orderDAO
            .findOrderById(orderId)
            .should.eventually.have.property("orderConfirmDate")
        ]);
      });
  });

  it("should confirm order with pay for delivery", () => {
    let stub = sinon.stub(send, "sendConfirmPaidMessageDelivery");
    let postBody = {
      orderId: orderId,
      method: "delivery",
      address: "330 phillip street",
      time: '"2017-08-15T18:00:00.000Z"',
      postal: "l9t2x5",
      room: "1234",
      authorized_payment: "1192",
      token_id: "tok_visa",
      token_email: "anthony112244@hotmail.com"
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
            .findOrderById(orderId)
            .should.eventually.have.property("isConfirmed", true),
          orderDAO
            .findOrderById(orderId)
            .should.eventually.have.property("methodFulfillment", "delivery"),
          orderDAO
            .findOrderById(orderId)
            .should.eventually.have.property("isPaid", true),
          orderDAO
            .findOrderById(orderId)
            .should.eventually.have.property("fulfillmentDate"),
          orderDAO
            .findOrderById(orderId)
            .should.eventually.have.property("orderConfirmDate")
        ]);
      });
  });



  it("should confirm order with pay for pick-up", () => {
    let stub = sinon.stub(send, "sendConfirmPaidMessagePickup");
    let postBody = {
      orderId: orderId,
      method: "pickup",
      time: '"2017-08-15T18:00:00.000Z"',
      address: "330 phillip street",
      postal: "l9t2x5",
      authorized_payment: "1192",
      token_id: "tok_visa",
      token_email: "anthony112244@hotmail.com"
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
            .findOrderById(orderId)
            .should.eventually.have.property("isConfirmed", true),
          orderDAO
            .findOrderById(orderId)
            .should.eventually.have.property("methodFulfillment", "pickup"),
          orderDAO
            .findOrderById(orderId)
            .should.eventually.have.property("isPaid", true),
          orderDAO
            .findOrderById(orderId)
            .should.eventually.have.property("fulfillmentDate"),
          orderDAO
            .findOrderById(orderId)
            .should.eventually.have.property("orderConfirmDate")
        ]);
      });
  });

  it("should delete items when posting to /delete", () => {
    let postBody = {
      orderId: orderId,
      removeIds: [itemId]
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
            .findOrderById(orderId)
            .should.eventually.have.property("_items")
            .that.has.length(0)
        ]);
      });
  });

  it("should render cashier view", () => {
    let spy = sinon.spy(pug, "__express");
    return request(app).get(`/cashier`).expect(200).then(() => {
      spy.calledWithMatch(/\/cashier\.pug$/).should.be.true;
      spy.restore();
    });
  });

  it("should get orderId", () => {
    return request(app).get(`/getorder/${orderId}`).then(res => {
      res.status.should.equal(200);
    });
  });
});


