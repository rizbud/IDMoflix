import express from 'express'
import { successResponse } from '../../helpers/response'
import movies from './movies'
import tvShows from './tvShows'
import movieGenre from './movieGenre'
import tvGenre from './tvGenre'
import movie from './movie'
import episode from './episode'

const router = express.Router()

router.get('/', (req, res) => {
  successResponse(res, {message: 'Welcome To IDMoflix API v1'})
})

router.use('/movies', movies)
router.use('/tv-shows', tvShows)
router.use('/movie-genre', movieGenre)
router.use('/tv-show-genre', tvGenre)
router.use('/movie', movie)
router.use('/episode', episode)

export default router