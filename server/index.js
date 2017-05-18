const app = require( './app');
const config = require('./../config/config');
const mongooseConnection = require('./../db/mongoose.js')

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})