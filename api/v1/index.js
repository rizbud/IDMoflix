import express from 'express'
import { successResponse } from '../../helpers/response'
import { APP_NAME } from '../../config'

import movies from './movies'
import tvShows from './tvShows'
import movieGenre from './movieGenre'
import tvGenre from './tvGenre'
import movie from './movie'
import episode from './episode'
import tvShow from './tvShow'

const router = express.Router()

router.get('/', (req, res) => {
  successResponse(res, {message: `Welcome To ${APP_NAME} API v1`})
})

router.use('/movies', movies)
router.use('/tv-shows', tvShows)
router.use('/movie-genre', movieGenre)
router.use('/tv-show-genre', tvGenre)
router.use('/movie', movie)
router.use('/episode', episode)
router.use('/tv-show', tvShow)

export default router