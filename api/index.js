import express from 'express'
import { successResponse } from '../helpers/response.js'
import v1 from './v1'

const router = express.Router()

router.get('/', (req, res) => {
  successResponse(res, {message: 'Welcome To IDMoflix API'})
})

router.use('/v1', v1)

export default router