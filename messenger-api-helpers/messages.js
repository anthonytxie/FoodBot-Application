const messageTemplate = (runnerPackage) => {
  return {text: 'this is the template message. ' + runnerPackage};
};


const newOrderButton = { 
    type: 'postback',
    title: 'Littttt',
    payload: JSON.stringify({
      type: 'create_new_order',
    })
  };

const orderButton = { 
    type: 'postback',
    title: 'Tits',
    payload: JSON.stringify({
      type: 'order',
    })
  };

const initializeButton = { 
    type: 'postback',
    title: 'FatBoi',
    payload: JSON.stringify({
      type: 'initialize',
    })
  };
const persistentMenu = {
  setting_type: 'call_to_actions',
  thread_state: 'existing_thread',
  call_to_actions: [
    newOrderButton,
    orderButton,
    initializeButton
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
