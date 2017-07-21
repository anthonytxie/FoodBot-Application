const controller = {};
const actionMap = new Map();


controller.Post = (req, res) => {
  if (req.body && req.body.result) {
    const result = req.body.result;
    const session = req.body.sessionId;

    actionMap.get(result.action)(req,res,result,session)
  }

  else {
    res.status(400).send('400! There was no post body sent!')
  }
};

module.exports =  {controller};
