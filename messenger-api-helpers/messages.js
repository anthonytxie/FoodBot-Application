const messageTemplate = (runnerPackage) => {
  return {text: 'this is the template message. ' + runnerPackage};
};


const newOrderButton = { 
    type: 'postback',
    title: 'New Order',
    payload: JSON.stringify({
      type: 'initialize',
    })
  };

const orderButton = { 
    type: 'postback',
    title: 'Order',
    payload: JSON.stringify({
      type: 'initialize',
    })
  };


const persistentMenu = {
  setting_type: 'call_to_actions',
  thread_state: 'existing_thread',
  call_to_actions: [
    newOrderButton,
    orderButton
  ],
};



const getStarted = {
  setting_type: 'call_to_actions',
  thread_state: 'new_thread',
  call_to_actions: [
    {
      payload: JSON.stringify({
        type: 'initialize',
      }),
    },
  ],
};



module.exports = { messageTemplate, persistentMenu, getStarted };
