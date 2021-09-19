import express from 'express'
import { successResponse } from '../../helpers/response.js'
import genre from './genre.js'

const router = express.Router()

router.get('/', (req, res) => {
  successResponse(res, {message: 'Welcome To IDMoflix API v1'})
})

router.use('/genre', genre)

export default router