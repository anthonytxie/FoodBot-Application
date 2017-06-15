
let cashierBusy = false;
let cookOneBusy = false;
let cookTwoBusy = false;
let cookThreeBusy = false;
let CookFourBusy = false;




function takeOrder () {
  console.log('taking order')
  cashierBusy=true;
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve('order taken')

      },2000);
  });
};

function cookOne (order) {
  cookOneBusy = true;
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      if (order=='order taken') {
        cookOneBusy = false;
        resolve('order complete')
      }
    },4000);
  });
};

function cookTwo (order) {
  cookOneBusy = true;
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      if (order=='order taken') {
        cookOneBusy = false;
        resolve('order complete')
      }
    },4000);
  });
};


function cookThree (order) {
  cookOneBusy = true;
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      if (order=='order taken') {
        cookOneBusy = false;
        resolve('order complete')
      }
    },4000);
  });
};


function cookFour (order) {
  cookOneBusy = true;
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      if (order=='order taken') {
        cookOneBusy = false;
        resolve('order complete')
      }
    },4000);
  });
};


function passToCook(order) {
  if (!cookOneBusy) {
    return cookOne(order);
  }
  else if (!cookTwoBusy) {
    return cookTwo(order);
  }
  else if (!cookThreeBusy) {
    return cookThree(order);
  } 
  else if (!cookFourBusy) {
    return cookFour(order);
  }
}



takeOrder()
  .then((order) => {
    console.log(order);
    return order
  })
  .then((order) => {
    return passToCook(order);
  })
  .then((status) => console.log(status))

