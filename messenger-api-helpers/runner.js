
const initialize = () => {
  return new Promise((resolve, reject) => {
    resolve('initialized order')
  });
};

const createNewOrder = () => {
  return new Promise((resolve, reject) => {
    resolve('created new order')
  });
};


const order = () => {
  return new Promise((resolve, reject) => {
    resolve('added to order')
  });
};


module.exports = { initialize, createNewOrder, order };