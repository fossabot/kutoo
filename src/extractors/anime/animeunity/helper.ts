import cheerio from 'cheerio'
import got from 'got'

import { EpisodeInfo, SeasonInfo } from '../../../types'

export async function createEpisodeInfo (url: string): Promise<EpisodeInfo> {
  const response = await got(url)
  const $ = cheerio.load(response.body)
  const titleSelector = 'body > div.container.my-4 > div > div:nth-child(4) > ' +
    'div.col-lg-4.col-sm-12.custom-padding-bottom > div > div.card-body.bg-light-gray > p:nth-child(2)'
  const directUrl = $('#video-player > source').attr('src') ?? ''
  const episodeNumber = parseFloat($('a.btn-purple').text())
  const title = $(titleSelector).html() ?? ''
    .replace('<b>TITOLO: </b>', '')
    .replace(/\s\s+/g, ' ')
    .replace(/\s/, '')

  const info: EpisodeInfo = {
    url: url,
    directUrl: directUrl,
    resolution: ['hd'],
    title: title,
    name: title,
    ext: 'mp4',
    number: episodeNumber,
    subtitles: {
      type: 'burned'
    }
  }
  return info
}

export async function createSeasonInfo (url: string): Promise<SeasonInfo> {
  const response = await got(url)
  const $ = cheerio.load(response.body)

  const titleSelector = 'body > div.container.my-4 > div > div:nth-child(4) > ' +
    'div.col-lg-4.col-sm-12.custom-padding-bottom > div > div.card-body.bg-light-gray > p:nth-child(2)'

  const title = $(titleSelector).html() ?? ''
    .replace('<b>TITOLO: </b>', '')
    .replace(/\s\s+/g, ' ')
    .replace(/\s/, '')

  const links: string[] = []

  $('.ep-box > a').each((i: number, el: CheerioElement) => {
    // eslint-disable-next-line
      const href = $(el).attr('href')!
    links.push(`https://www.animeunity.it/${href}`)
  })

  const info: SeasonInfo = {
    url: '',
    status: 'unknown',
    episodesCount: 0,
    name: title,
    episodes: []
  }

  return info
}
