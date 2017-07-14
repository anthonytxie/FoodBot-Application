// const addStrings = (a,b,c,...d) => {
//   console.log(c,b,a,...d);
// }

// const array = ['a', 'b', 'c']



// const add = (a,b,c,d,...e) => {
//   var array = [a,b,c,d,...e]
//   return console.log(array)
// }


// add(1,2,3,4,1,2,3,4)
const castArray = require('lodash/castArray');


const sendInitializeMessage = (recipientId, runnerDelivery) => {
  sendMessage(recipientId, {text: 'hello'})
};

const messageToJSON = (recipientId, messagePayload) => {
  return {
    recipient: {
      id: recipientId,
    },
    message: messagePayload,
  };
};



const sendMessage = (recipientId, messagePayloads) => {
  // in case there are multiple message Payloads it casts as an array
  // then iterates over each to convert into JSON format for sender API.
  const messagePayloadArray = castArray(messagePayloads)
    .map((messagePayload) => messageToJSON(recipientId, messagePayload));

  console.log(...messagePayloadArray)
};


sendInitializeMessage(1234)



const person = {
  height: '1234'
}

console.log(`this guy is ${person.height}`)

