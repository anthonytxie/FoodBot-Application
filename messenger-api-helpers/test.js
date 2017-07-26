

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




console.log(typeof('hello'))


if (typeof('2134')==='string') {
  console.log('yes')
}


