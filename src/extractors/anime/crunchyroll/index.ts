import got from 'got'
import cheerio from 'cheerio'
import { Config } from './config'
import { getConfig } from './helper'

import { EpisodeInfo, SeasonInfo, AnimeExtractor } from '@kutoo/types'
import { parseManifest, switchResolution } from '@kutoo/utils'

export async function createEpisodeInfo (url: string): Promise<EpisodeInfo> {
  const config: Config = await getConfig(url)

  const info: EpisodeInfo = {
    author: '',
    content: 'episode',
    url: url,
    directUrlType: 'manifest',
    duration: 0,
    directUrls: {
      uhd: null,
      fhd: null,
      hd: null,
      sd: null,
      low: null,
      ulow: null
    },
    title: config.metadata.title,
    number: parseFloat(config.metadata.episode_number),
    ext: 'mp4',
    subtitles: {
      type: 'external'
    }
  }

  for (const stream of config.streams) {
    if (stream.format === 'multitrack_adaptive_hls_v2' && stream.hardsub_lang == null) {
      const parsedManifest = await parseManifest(stream.url)
      for (const list of parsedManifest.playlists) {
        const res = list.attributes.RESOLUTION
        const switchedRes = switchResolution([res.width, res.height])
        info.directUrls[switchedRes] = stream.url
      }
    }
  }

  for (const sub of config.subtitles) {
    info.subtitles[sub.language] = sub.url
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
    number: 0,
    author: '',
    url: '',
    year: 0,
    studio: '',
    status: 'unknown',
    episodesCount: 0,
    title: title,
    episodes: {}
  }

  for (const lnk of links) {
    info.episodes[links.indexOf(lnk)].getInfo = async () => {
      return await createEpisodeInfo(lnk)
    }
  }

  return [info]
}
const crunchyroll: AnimeExtractor = {
  createEpisodeInfo,
  createSeasonInfo
}

export default crunchyroll
