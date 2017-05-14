import express from 'express'
import routes from './routes'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
mongoose.connect('mongodb://localhost:27017/toni', () => {
  console.log('Connected to mongoDB')
})
mongoose.Promise = global.Promise;



const app = express();


//Middleware
app.use(bodyParser.json())
app.use(routes)

export default app