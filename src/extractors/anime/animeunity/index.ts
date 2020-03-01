import cheerio from 'cheerio'
import got from 'got'

import { DownloadOptionsDefined, EpisodeInfo, SeasonInfo, AnimeExtractor } from '../../../types'
import { downloadFile, createFileName } from '../../../utils'

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
    directUrlType: 'video',
    directUrls: {
      uhd: directUrl,
      fhd: directUrl,
      hd: directUrl,
      sd: directUrl,
      low: directUrl,
      ulow: directUrl
    },
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
    url: links[0],
    status: 'unknown',
    episodesCount: links.length,
    name: title,
    episodes: links.map(async lnk => createEpisodeInfo(lnk))
  }

  return info
}

async function downloadEpisode (url: string, path: string, options: DownloadOptionsDefined): Promise<void> {
  const info = await createEpisodeInfo(url)
  await downloadFile(info.directUrls[options.resolution], path, createFileName(info, options.filePattern))
}

async function downloadSeason (url: string, path: string, options: DownloadOptionsDefined): Promise<void> {
  const info = await createSeasonInfo(url)
  for (const episode of info.episodes) {
    const epInfo = await episode
    await downloadEpisode(epInfo.url, path, options)
  }
}
const animeunity: AnimeExtractor = { createEpisodeInfo, createSeasonInfo, downloadEpisode, downloadSeason }

export default animeunity
