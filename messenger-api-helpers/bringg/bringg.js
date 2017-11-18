const CryptoJS = require("crypto-js");
const request = require("request-promise-native");
const param = require("jquery-param");
const company_id = "10854";
const access_token = "tkqY7KQDWzys1U74hE3b";
const secret_key = "YihV3voc3AXbQNEzyQAS";

const createBringgCustomer = user => {
  let body = {
    name: user.firstName,
    company_id: company_id,
    phone: user.phoneNumber,
    timestamp: Date.now(),
    access_token: access_token
  };
  body.signature = CryptoJS.HmacSHA1(param(body), secret_key).toString();
  return request.post({
    url: "https://developer-api.bringg.com/partner_api/customers",
    headers: {
      "Content-Type": "application/json"
    },
    body: body,
    json: true
  });
};

const createBringgWaypoint = user => {
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
        address: user.address,
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

const createBringgTask = (taskId, waypointId, confirmationNumber) => {
  let body = {
    access_token: access_token,
    timestamp: Date.now(),
    company_id: company_id,
    type: 2,
    note: "this is another test note",
    url: "http://burgerburger.ca/"
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


module.exports = { createBringgCustomer, createBringgWaypoint, createBringgTask}

// createBringgCustomer({ firstName: "Anthony", phoneNumber: "519-857-8997" })
//   .then(body => {
//     return createBringgWaypoint({
//       address: "25 brentwood crescent",
//       integrationIds: { bringgId: body.customer.id }
//     });
//   })
//   .then(body => {
//     return createBringgTask(body.task.id, body.task.way_points[1].id)
//   }).then((body) => {
//     console.log(body)
//   })



