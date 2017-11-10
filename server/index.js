const app = require( './app');
const config = require('./../config/config');
const mongooseConnection = require('./../db/mongoose.js')

const port = process.env.PORT;
app.listen(port, () => {
  logger.info(`listening on port ${port}`)
})

module.exports = {app};