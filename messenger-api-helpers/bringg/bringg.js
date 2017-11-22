const CryptoJS = require("crypto-js");
const request = require("request-promise-native");
const param = require("jquery-param");
const company_id = "10854";
const access_token = "tkqY7KQDWzys1U74hE3b";
const secret_key = "YihV3voc3AXbQNEzyQAS";
const { logger } = require("./../../server/logger/logger");
const userDAO = require("./../../db/DAO/userDAO");

const createCustomer = user => {
  return new Promise((resolve, reject) => {
    logger.info("Bringg API createCustomer");
    let body = {
      name: user.firstName || "Unknown",
      company_id: company_id,
      phone: user.phoneNumbers.slice(-1).pop(),
      timestamp: Date.now(),
      access_token: access_token
    };
    body.signature = CryptoJS.HmacSHA1(param(body), secret_key).toString();
    return request
      .post({
        url: "https://developer-api.bringg.com/partner_api/customers",
        headers: {
          "Content-Type": "application/json"
        },
        body: body,
        json: true
      })
      .then(body => {
        resolve(userDAO.updateBringgId(user._id, body.customer.id));
      })
      .catch(err => reject(err));
  });
};

const createWaypoint = user => {
  logger.info("Bringg API createWaypoint");
  let body = {
    access_token: access_token,
    timestamp: Date.now(),
    customer_id: user.integrationIds.bringgId,
    company_id: company_id,
    way_points: JSON.stringify([
      {
        customer_id: "4260514",
        address: "633 Richmond St, London",
        city: "London"
      },
      {
        customer_id: user.integrationIds.bringgId,
        address: user.address || "Unknown please check with restaurant",
        city: "London"
      }
    ])
  };
  body.signature = CryptoJS.HmacSHA1(param(body), secret_key).toString();
  return request.post({
    url:
      "https://developer-api.bringg.com/partner_api/tasks/create_with_way_points",

    headers: {
      "Content-Type": "application/json"
    },
    body: body,
    json: true
  });
};

const createTask = (taskId, waypointId, order) => {
  logger.info("Bringg API createTask");
  let body = {
    access_token: access_token,
    timestamp: Date.now(),
    company_id: company_id,
    type: 1,
    note: JSON.stringify([
      ["Item", "Size"],
      ...order._items.map(x => {
        return [x.itemName, x.itemSize || "Standard"];
      })
    ])
  };

  body.signature = CryptoJS.HmacSHA1(param(body), secret_key).toString();
  return request.post({
    url: `http://developer-api.bringg.com/partner_api/tasks/${taskId}/way_points/${waypointId}/notes`,

    headers: {
      "Content-Type": "application/json"
    },
    body: body,
    json: true
  });
};

module.exports = { createCustomer, createWaypoint, createTask };
