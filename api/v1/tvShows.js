import express from 'express'
import { listResponse, failureResponse } from '../../helpers/response.js'
import cheerio from 'cheerio'
import { api } from '../../config.js'
import { getListPath, getListGenre, getListTitle, getListYear, getListThumbnail, getTotalPage } from '../../helpers/cheerio/tvShows.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const {page = 1} = req?.params
  try {
    const response = await api.get(`/tv-shows/page/${page}`)
    const $ = cheerio.load(response.data)
    const tv = $('body').find('div[id="page"] > div[id="content"] > div[class="container"] > div[class="site-content__inner"] > div[id="primary"] > div[class="vodi-archive-wrapper"] > div[class="tv-shows columns-5"] > div[class="tv-shows__inner"] > div')
    const data = Array.from(tv).map(el => {
      const selector = $(el)
      
      return {
        title: getListTitle(selector),
        path: getListPath(selector),
        thumbnail: getListThumbnail(selector),
        year: getListYear(selector),
        genres: getListGenre($, selector)
      }
    })

    const pagination = {
      page,
      totalPage: getTotalPage($)
    }

    listResponse(res, data, pagination)
  } catch(err) {
    failureResponse(res, err?.response?.status)
  }
})

export default router