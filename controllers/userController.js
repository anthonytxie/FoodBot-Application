const userController = {};
const User = require('./../db/models/User')


userController.post = (req, res) => {
  const { phoneNumber } = req.body;

  User.find({phoneNumber})
    .then((user) => {
      if(!user.length) {
        const user = newUser({phoneNumber});
        user.save()
          .then((user) => {
            res.json({
              data: user,
              success:true
            });
          }).catch((err) => {
            res.json({
              data:err,
              success:false
            });
          });
      }
    else {
      


      
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

module.exports = userController;

