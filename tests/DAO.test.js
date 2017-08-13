const mongoose = require("mongoose");
const config = require("./../config/config");
mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();
chai.use(require("chai-things"));
const userDAO = require("./../db/DAO/userDAO");
const sessionDAO = require("./../db/DAO/sessionDAO");
const orderDAO = require("./../db/DAO/orderDAO");

const { User, Session, Order } = require("./../db/models/index");

let userId;
let firstSessionId;
let PSID;
let orderId;

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
      PSID = user.PSID;
      return orderDAO.initializeOrder(PSID, firstSessionId);
    })
    .then(order => {
      orderId = order._id;
      done();
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
  it("should return whether a session is active", () => {
    let result = sessionDAO.isSessionActive(PSID);
    return Promise.all([
      result.should.eventually.be.true
      // should test a false version true
    ]);
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
      result.should.eventually.have.property("_items").that.has.length(0)
    ]);
  });

  it("should find order by sessionId", () => {
    let result = orderDAO.getOrderBySessionId(firstSessionId);
    return Promise.all([
      result.should.eventually.have.deep.property("_id"),
      result.should.eventually.have.property("_items").that.has.length(0)
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
    let result = orderDAO.updateInputtedOrder(orderId)
    return Promise.all([
      result.should.eventually.have.property("_id"),
      result.should.eventually.have.property("isInputted", true),
      result.should.eventually.have.property("inputDate"),
    ]);
  });
});