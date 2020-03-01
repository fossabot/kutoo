// import ffmpeg from 'fluent-ffmpeg'
import got from 'got'
// @ts-ignore
import { Parser } from 'm3u8-parser'

import { resolve as resolvePath } from 'path'

import { createEpisodeInfo, createSeasonInfo } from './helper'
import { downloadManifest, createFileName } from '../../../utils'

import { EpisodeInfo, SeasonInfo, contentType, DownloadOptionsDefined } from '../../../types'

async function getInfo (url: string, content: 0 | 'episode'): Promise<EpisodeInfo>
async function getInfo (url: string, content: 1 | 'season'): Promise<SeasonInfo>
async function getInfo (url: string, content: contentType): Promise<any> {
  if (content === 0 || content === 'episode') {
    return createEpisodeInfo(url)
  } else if (content === 1 || content === 'season') {
    return createSeasonInfo(url)
  } else {
    throw new Error()
  }
}

async function download (url: string, path: string, options: DownloadOptionsDefined): Promise<void> {
  const info = await getInfo(url, 0)
  let videoWidth: number
  let videoHeight: number

  switch (options.resolution) {
    case 'fhd': case 'uhd':
      videoWidth = 1920
      videoHeight = 1080
      break
    case 'hd':
      videoWidth = 1280
      videoHeight = 720
      break
    case 'sd':
      videoWidth = 848
      videoHeight = 480
      break
    case 'low':
      videoWidth = 640
      videoHeight = 360
      break
    case 'ulow':
      videoWidth = 428
      videoHeight = 240
      break
    default:
      break
  }

  const parser = new Parser()
  const response = await got(info.directUrl)
  const streamUrl = response.body
  parser.push(streamUrl)
  parser.end()
  const mainPlaylist = parser.manifest
  const link = mainPlaylist.playlists.find((playlist: any) => {
    return playlist.attributes.RESOLUTION.height === videoHeight &&
            playlist.attributes.RESOLUTION.width === videoWidth
  })
  const fileName = createFileName(info, options.filePattern)
  downloadManifest(link.uri, resolvePath(path, fileName), true)
}

// async function getSeasons(url: string) {
//     const langRegex = /(?<=\.com)(.*)(?=\/)/
//     url = url.replace(langRegex, '')

//     let cookieJar = await setLanguageCookie('enUS')

//     const response = await got(url, { cookieJar })
//     const $ = cheerio.load(response.body)

//     let seasons: Season[] = []

//     $('#showview_content_videos > ul > li').each((i: number, el: CheerioElement) => {
//         let title = $(el).children('a').attr('title')!

//         let episodes: d.Episode[] = []

//         $(`#showview_content_videos > ul > li:has(a[title="${title}"]) > ul a`).each((i: number, el: CheerioElement) => {
//             let link = 'https://www.crunchyroll.com' + $(el).attr('href')

//             let episode = getEpisode(link)

//             episodes.push(episode)
//         })
//         seasons[i] = {
//             title: title,
//             episodes: episodes
//         }
//     });

//     return seasons
// }

export default { download, getInfo }
