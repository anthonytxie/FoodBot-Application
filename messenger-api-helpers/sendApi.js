// ===== LODASH ================================================================
const castArray = require('lodash/castArray');
const isEmpty = require('lodash/isEmpty');

// ===== MODULES ===============================================================
const request =  require('request');


const PAGE_ACCESS_TOKEN = process.env.page_token || 'EAACH5pouINQBAGRIEVUI1dg9BwjBg0b6vIiZC6HkLwLo6YhUrpvIU1xNtKvYKZAxyxt5CDYviuIdYAezlE7LNGlR7TQe1uDRIvc5zhhw3kabwHUPzBKWhV6iWXIaVCJuKIvKm7BiZCNst2fJp7dZAw77EqxGPbAFlmeZCnk2FCwZDZD';

const callAPI = (endPoint, messageDataArray, queryParams = {}, retries = 0) => {
  // Error if developer forgot to specify an endpoint to send our request to
  if (!endPoint) {
    console.error('callAPI requires you specify an endpoint.');
    return;
  }

  // Error if we've run out of retries.
  if (retries < 0) {
    console.error(
      'No more retries left.',
      {endPoint, messageDataArray, queryParams}
    );

    return;
  }

  // ensure query parameters have a PAGE_ACCESS_TOKEN value
  /* eslint-disable camelcase */
  const query = Object.assign({access_token: PAGE_ACCESS_TOKEN}, queryParams);
  /* eslint-enable camelcase */

  // ready the first message in the array for send.
  const [messageToSend, ...queue] = castArray(messageDataArray);
  request({
    uri: `https://graph.facebook.com/v2.6/me/${endPoint}`,
    qs: query,
    method: 'POST',
    json: messageToSend,

  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      // Message has been successfully received by Facebook.
      console.log(
        `Successfully sent message to ${endPoint} endpoint: `,
        JSON.stringify(body)
      );

      // Continue sending payloads until queue empty.
      if (!isEmpty(queue)) {
        callAPI(endPoint, queue, queryParams);
      }
    } else {
      // Message has not been successfully received by Facebook.
      console.error(
        `Failed calling Messenger API endpoint ${endPoint}`,
        response.statusCode,
        response.statusMessage,
        body.error,
        queryParams
      );

      // Retry the request
      console.error(`Retrying Request: ${retries} left`);
      callAPI(endPoint, messageDataArray, queryParams, retries - 1);
    }
  });
};

const callMessagesAPI = (messageDataArray, queryParams = {}) => {
  return callAPI('messages', messageDataArray, queryParams);
};

const callThreadAPI = (endpoint, messageDataArray, queryParams = {}) => {
  return callAPI(endpoint, messageDataArray, queryParams);
};




module.exports = { callAPI, callMessagesAPI, callThreadAPI };