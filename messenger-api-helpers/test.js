

const promise = () => {
  return new Promise((resolve,reject) => {
    resolve('hello')
  });
};


const resolvePromise = () => {
  return promise()
    .then((message) => {
      return message +' tom'
    })


}

resolvePromise()
  .then((success) => console.log(success))








