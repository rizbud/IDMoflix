import express from 'express'
import { successResponse } from '../../helpers/response.js'
import movies from './movies.js'

const router = express.Router()

router.get('/', (req, res) => {
  successResponse(res, {message: 'Welcome To IDMoflix API v1'})
})

router.use('/movies', movies)

export default router