import app from './app'
import config from './../config/config'
import mongooseConnection from './../db/mongoose.js'

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})