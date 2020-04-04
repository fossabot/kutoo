import cheerio from 'cheerio'
import got from 'got'

import { EpisodeInfo, SeasonInfo, AnimeExtractor } from '@kutoo/types'

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
    content: 'episode',
    author: '',
    url: url,
    directUrlType: 'video',
    directUrls: {
      uhd: null,
      fhd: directUrl,
      hd: null,
      sd: null,
      low: null,
      ulow: null
    },
    duration: 0,
    title: title,
    ext: 'mp4',
    number: episodeNumber,
    subtitles: {
      type: 'burned'
    }
  }
  return info
}

export async function createSeasonInfo (url: string): Promise<SeasonInfo[]> {
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
    content: 'season',
    title: title,
    author: '',
    url: links[0],
    status: 'unknown',
    year: 0,
    studio: '',
    number: 0,
    episodesCount: links.length,
    episodes: {}
  }

  for (const lnk of links) {
    info.episodes[links.indexOf(lnk)].getInfo = async () => {
      return await createEpisodeInfo(lnk)
    }
  }

  return [info]
}

const animeunity: AnimeExtractor = {
  createEpisodeInfo,
  createSeasonInfo
}

export default animeunity
