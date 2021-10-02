import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'

import apiRouter from './api/index.js'
import { successResponse } from './helpers/response.js'

dotenv.config()
const app = express()
const api = process.env.API_URL

app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(cors())
app.options('*', cors)

app.listen(3000, () => {
  console.log('App is running on port 3000');
})

app.get('/', (req, res) => {
  successResponse(res, {message: 'Welcome to IDMoflix'})
})

app.use('/api', apiRouter)