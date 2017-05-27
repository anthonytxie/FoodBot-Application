const orderController = {};



orderController.post = (req, res) => {


}


toDoController.post = (req,res) => {
  const { text, _user } = req.body;
  const toDo = new db.toDo({
    text,
    _user,
  })
  toDo.save().then((toDo) => {
    res.send(toDo);
  }).catch((err) => {
    res.status(400).send(err)
  });
};






basicController.get = (req, res) => {
  res.send('Welcome to the Application');
};

module.exports = basicController;