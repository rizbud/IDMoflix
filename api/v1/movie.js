import express from 'express'
import { successResponse, failureResponse } from '../../helpers/response'
import cheerio from 'cheerio'
import { api, TARGET_URL } from '../../config'

const router = express.Router()

router.get('/:slug', async (req, res) => {
  const {slug} = req?.params
  try {
    const response = await api.get(`/movie/${slug}`)
    const $ = cheerio.load(response.data)
    const movie = $('body').find('div[id="page"] > div[id="content"] > div[class="container"] > div[class="site-content__inner"] > div[id="primary"] > div > div[class="single-movie__content column"] > div[class="single-movie__content-inner"] > div[class="single-movie__player"]')
    const selector = $(movie)
    const summary = selector.find('div[class="summary entry-summary"]')
    const head = $(summary).find('div[class="movie__info--head"] > div[class="movie__info--head-inner"]')

    const getGenres = () => {
      const genres = $(head).find('span[class="movie__meta--genre"]')
      return Array.from(genres).map(el => {
        return {
          title: $(el).find('a').text(),
          path: $(el).find('a').attr('href')?.replace(TARGET_URL, '')
        }
      })
    }

    const getDownloadLink = () => {
      const downloads = $(summary).find('div[class="movie__short-description"] > div')
      return Array.from(downloads).map(el => {
        return $(el).find('a').attr('href')
      })
    }

    const data = {
      title: $(head).find('h1').text(),
      description: $(summary).find('div[class="movie__short-description"] > p').text(),
      year: $(head).find('span[class="movie__meta--release-year"]').text(),
      duration: $(head).find('span[class="movie__meta--movie-run-time"]').text(),
      player_url: selector.find('div[class="movie__head"] > div[class="movie__player"] > p > iframe').attr('src'),
      download_link: getDownloadLink(),
      genres: getGenres(),
    }

    successResponse(res, data)
  } catch(err) {
    failureResponse(res, err?.response?.status)
  }
})

export default router