import cheerio from 'cheerio'
import got from 'got'
import { CookieJar } from 'tough-cookie'
import { Config } from './config'

import * as utils from '../../../utils'

import { EpisodeInfo, SeasonInfo } from '../../../types'

export async function setLanguageCookie (lang: string): Promise<CookieJar> {
  const cookieJar = new CookieJar()

  const response = await got('https://www.crunchyroll.com/', { cookieJar })
  const $ = cheerio.load(response.body)

  const languageFunc = $('#footer_language_list > li:nth-child(1) > a').attr('onclick') ?? ''
  const tokenRegex = /(?<=').{43}(?=')/g
  const match = languageFunc.match(tokenRegex) ?? ''
  const token = match[0]

  await got.post('https://www.crunchyroll.com/ajax/', {
    form: {
      req: 'RpcApiTranslation_SetLang',
      locale: lang,
      _token: token
    },
    cookieJar: cookieJar
  })

  return cookieJar
}

export async function getConfig (url: string): Promise<Config> {
  const response = await got(url)
  const config = utils.getStringBewtween(response.body, 'vilos.config.media = ', ']};', 2)
  return JSON.parse(config)
}

export async function createEpisodeInfo (url: string): Promise<EpisodeInfo> {
  const config: Config = await getConfig(url)

  const info: EpisodeInfo = {
    url: url,
    directUrlType: 'manifest',
    directUrls: {
      uhd: '',
      fhd: '',
      hd: '',
      sd: '',
      low: '',
      ulow: ''
    },
    resolution: ['fhd'],
    name: config.metadata.title,
    title: config.metadata.title,
    number: parseFloat(config.metadata.episode_number),
    ext: 'mp4',
    subtitles: {
      type: 'external'
    }
  }

  // config.streams.forEach((stream) => {
  //   if (stream.format === 'multitrack_adaptive_hls_v2' && stream.hardsub_lang == null) {
  //     info.directUrl = stream.url
  //   }
  // })

  config.subtitles.forEach((sub) => {
    info.subtitles[sub.language] = sub.url
  })

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
