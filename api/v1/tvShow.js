import express from 'express'
import { successResponse, failureResponse } from '../../helpers/response'
import cheerio from 'cheerio'
import { api, TARGET_URL } from '../../config'

const router = express.Router()

router.get('/:slug', async (req, res) => {
  const {slug} = req?.params
  try {
    const response = await api.get(`/tv-show/${slug}`)
    const $ = cheerio.load(response.data)
    const body = $('body').find('div[id="page"] > div[id="content"] > div[class="container"] > div[class="site-content__inner"] > div[id="primary"] > div')
    const season = $(body).find('div[class="tv_show__season-tabs-wrap stretch-full-width"] > div[class="masvideos-tabs"] > div[class="tab-content"] > div')
    const seasons = Array.from(season).map((el, index) => {
      const episodes = $(el).find('div[class="masvideos masvideos-episodes "] > div[class="episodes columns-6"] > div[class="episodes__inner"] > div')
      const episode = Array.from(episodes).map(item => {
        const episodeBody = $(item).find('div[class="episode__body"]')
        return {
          title: $(episodeBody).find('a > h3').text(),
          path: $(episodeBody).find('a').attr('href')?.replace(TARGET_URL, ''),
          thumbnail: $(item).find('div[class="episode__poster"] > a > img').attr('src'),
          tag: $(episodeBody).find('a > span').text(),
        }
      })

      return {
        [`season-${index+1}`]: episode
      }
    })
    
    const getListGenre = () => {
      const genres = $(body).find('div[class="summary entry-summary"] > div[class="tv-show__info--head"] > div[class="tv-show__meta"] > span > a')
      return Array.from(genres).map(el => {
        return {
          title: $(el).text(),
          path: $(el).attr('href')?.replace(TARGET_URL, '')
        }
      })
    }

    const data = {
      title: $(body).find('h1').text(),
      description: $(body).find('div[class="tv-show__short-description"] > p').text(),
      image: $(body).find('div[class="tv-show__head"] > div[class="tv-show__head--inner"] > img').attr('src'),
      genres: getListGenre(),
      seasons
    }

    successResponse(res, data)
  } catch(err) {
    failureResponse(res, err?.response?.status)
  }
})

export default router