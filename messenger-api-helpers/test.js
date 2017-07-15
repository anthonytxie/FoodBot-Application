

const promise = () => {
  return new Promise((resolve,reject) => {
    resolve('hello')
  });
};


const resolvePromise = () => {
  return promise()

}

resolvePromise()
  .then((success) => console.log(success))








