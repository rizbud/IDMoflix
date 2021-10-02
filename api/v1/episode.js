import express from 'express'
import { successResponse, failureResponse } from '../../helpers/response.js'
import cheerio from 'cheerio'
import { api, TARGET_URL } from '../../config.js'

const router = express.Router()

router.get('/:slug', async (req, res) => {
  const {slug} = req?.params
  try {
    const response = await api.get(`/episode/${slug}`)
    const $ = cheerio.load(response.data)
    const episode = $('body').find('div[id="page"] > div[id="content"] > div[class="container"] > div[class="site-content__inner"] > div[id="primary"] > div')
    const selector = $(episode)
    const head = selector.find('div[class="summary entry-summary episode__summary"]')

    const getDownloadLink = () => {
      const downloads = $(episode).find('div[class="masvideos-tabs episode-tabs"] > div[class="tab-content"] > div > div[class="episode__description"] > div > div[class="wp-block-button is-style-outline"]')
      return Array.from(downloads).map(el => {
        return $(el).find('a').attr('href')
      })
    }

    const data = {
      title: $(head).find('h1').text(),
      duration: $(head).find('span[class="episode__meta--duration"]').text(),
      created_at: $(head).find('span[class="episode__meta--release-date"]').text(),
      player_url: selector.find('div[class="episode__head"] > div[class="episode__player"] > p > iframe').attr('src'),
      download_link: getDownloadLink(),
    }

    successResponse(res, data)
  } catch(err) {
    failureResponse(res, err?.response?.status)
  }
})

export default router