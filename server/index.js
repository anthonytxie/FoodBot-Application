import app from './app'
import config from './../config/config'
import mongooseConnection from './../db/mongoose.js'

app.listen(3000, () => {
  console.log('listening on port 300')
})