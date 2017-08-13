const mongoose = require("mongoose");
const config = require("./../config/config");
mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();
chai.use(require("chai-things"));
const itemDAO = require("./../db/DAO/itemDAO");
const userDAO = require("./../db/DAO/userDAO");
const sessionDAO = require("./../db/DAO/sessionDAO");
const orderDAO = require("./../db/DAO/orderDAO");

const { User, Session, Order } = require("./../db/models/index");

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
  itemCombo: true
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
    return Promise.all([result.should.eventually.have.length(1)]);
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