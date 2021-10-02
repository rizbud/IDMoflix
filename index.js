import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import apiRouter from './api/index'
import { successResponse } from './helpers/response'
import {APP_NAME} from './config'

const app = express()

app.use(morgan('tiny'))
app.use(cors())
app.options('*', cors)

app.listen(3000, () => {
  console.log('App is running on port 3000');
})

app.get('/', (req, res) => {
  successResponse(res, {message: `Welcome to ${APP_NAME}`})
})

app.use('/api', apiRouter)