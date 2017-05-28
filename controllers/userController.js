const userController = {};
const User = require('./../db/models/User')


userController.post = (req, res) => {
  const { phoneNumber } = req.body;

  User.findOne({phoneNumber})
    .then((user) => { //if non-existent then this sends back empty array
      if(!user) { 
        const user = new User({phoneNumber});
        user.save()
          .then((user) => {
            req.session.user = user;
            res.status(200);
          }).catch((err) => {
            res.status(400);
          });
      }
    else {
      req.session.user = user;
      res.status(200);
      res.redirect('/getMostRecentOrder')
    }
    })
};

userController.get = (req, res) => {
  User.find()
    .then((users) => {
      res.json({
        data: users,
        success: true
      });
    }).catch((err) => {
      res.json({
      data: err,
      success: false
      });
    });
};

userController.getUserSession = (req, res) => {
  res.send(req.session.user);
}

module.exports = userController;

