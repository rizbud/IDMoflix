import { TARGET_URL } from "../../config"

export const getListTitle = selector => {
  return selector.find('div > div[class="tv-show__body"] > div[class="tv-show__info"] > div[class="tv-show__info--head"] > a').text()
}

export const getListPath = selector => {
  const url = selector.find('div > div[class="tv-show__body"] > div[class="tv-show__info"] > div[class="tv-show__info--head"] > a').attr('href')
  return url?.replace(TARGET_URL, '')
}

export const getListThumbnail = selector => {
  return selector.find('div > div[class="tv-show__poster"] > a > img').attr('src')
}

export const getListYear = selector => {
  const getYear = selector.find('div > div[class="tv-show__body"] > div[class="tv-show__info"] > div[class="tv-show__info--head"] > div[class="tv-show__meta"] > span[class="tv-show__meta--release-year"]').text()
  const years = getYear?.replaceAll(' ', '').split('-')
  return years[0] === years[1] ? years[0] : getYear
}

export const getListGenre = ($, selector) => {
  const genres = selector.find('div > div[class="tv-show__body"] > div[class="tv-show__info"] > div[class="tv-show__info--head"] > div[class="tv-show__meta"] > span[class="tv-show__meta--genre"]')
  const genre = Array.from(genres).map(el => {
    const gen = $(el).find('a')
    return Array.from(gen).map(obj => {
      return {
        title: $(obj).text(),
        path: $(obj).attr('href')?.replace(TARGET_URL, '')
      }
    })
  })

  return genre
}

export const getTotalPage = ($) => {
  const pages = $('body').find('div[id="page"] > div[id="content"] > div[class="container"] > div[class="site-content__inner"] > div[id="primary"] > div[class="page-control-bar-bottom"] > nav > ul > li')
  const getPages = Array.from(pages).map(el => {
    return $(el).find('li > a').text()
  })
  return getPages[getPages?.length - 2]
}