import express from 'express'
import routes from './routes'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'


const app = express();


//Middleware
app.use(bodyParser.json())
app.use(routes)

export default app