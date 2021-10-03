import express from 'express'
import { APP_NAME } from '../config'
import { successResponse } from '../helpers/response'
import v1 from './v1'

const router = express.Router()

router.get('/', (req, res) => {
  successResponse(res, {message: `Welcome To ${APP_NAME} API`})
})

router.use('/v1', v1)

export default router