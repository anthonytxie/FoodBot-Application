// ===== MODULES ===============================================================
require("dotenv").config();
const request = require("request");

let publicProfileRequest = senderId => {
  return new Promise((resolve, reject) => {
    let requestURL = `https://graph.facebook.com/v2.6/${senderId}?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=${process
      .env.page_access_token}`;
    request(
      {
        url: requestURL,
        json: true
      },
      (error, response, body) => {
        if (!error & (response.statusCode === 200)) {
          resolve(body);
        } else {
          reject("Unable to get public profile");
        }
      }
    );
  });
};

module.exports = { publicProfileRequest };
