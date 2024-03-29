import { TARGET_URL } from "../../config"

export const getListTitle = selector => {
  return selector.find('div > div[class="movie__body"] > div[class="movie__info"] > div[class="movie__info--head"] > a').text()
}

export const getListPath = selector => {
  const url = selector.find('div > div[class="movie__body"] > div[class="movie__info"] > div[class="movie__info--head"] > a').attr('href')
  return url?.replace(TARGET_URL, '')
}

export const getListThumbnail = selector => {
  return selector.find('div > div[class="movie__poster"] > a > img').attr('src')
}

export const getListYear = selector => {
  return selector.find('div > div[class="movie__body"] > div[class="movie__info"] > div[class="movie__info--head"] > div[class="movie__meta"] > span[class="movie__meta--release-year"]').text()
}

export const getListGenre = ($, selector) => {
  const genres = selector.find('div > div[class="movie__body"] > div[class="movie__info"] > div[class="movie__info--head"] > div[class="movie__meta"] > span[class="movie__meta--genre"] > a')
  const genre = Array.from(genres).map(el => {
    return {
      title: $(el).text(),
      path: $(el).attr('href')?.replace(TARGET_URL, '')
    }
  })

  return genre
}

export const getTotalPage = ($) => {
  const pages = $('body').find('div[id="page"] > div[id="content"] > div[class="container"] > div[class="site-content__inner"] > div[id="primary"] > div[class="page-control-bar-bottom"] > nav > ul > li')
  const getPages = Array.from(pages).map(el => {
    return $(el).find('li > a').text()
  })
  const totalPage = getPages?.length > 0 ? getPages[getPages?.length - 2] : 1
  return totalPage
}