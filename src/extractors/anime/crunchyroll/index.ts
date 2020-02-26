// import ffmpeg from 'fluent-ffmpeg'
import got from 'got'
import { Parser } from 'm3u8-parser'

import { resolve as resolvePath } from 'path'

import { getConfig } from './helper'
import { downloadManifest, createFileName } from '../../../utils'
import { Config } from './config'

import { EpisodeInfo, downloadOptionsDefined } from '../../../types'

async function getInfo (url: string): Promise<EpisodeInfo> {
  const config: Config = await getConfig(url)

  const info: EpisodeInfo = {
    url: url,
    directUrl: '',
    resolution: ['fhd'],
    name: config.metadata.title,
    title: config.metadata.title,
    number: parseFloat(config.metadata.episode_number),
    ext: 'mp4',
    subtitles: {
      type: 'external'
    }
  }

  config.streams.forEach((stream) => {
    if (stream.format === 'multitrack_adaptive_hls_v2' && stream.hardsub_lang == null) {
      info.directUrl = stream.url
    }
  })

  config.subtitles.forEach((sub) => {
    info.subtitles[sub.language] = sub.url
  })

  return info
}

async function download (url: string, path: string, options: downloadOptionsDefined): Promise<void> {
  const info = await getInfo(url)
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
  const response = await got(url)
  const streamUrl = response.body
  parser.push(streamUrl)
  parser.end()
  const mainPlaylist = parser.manifest

  const link = mainPlaylist.playlists.find((playlist: any) => {
    return playlist.attributes.RESOLUTION.height === videoHeight &&
            playlist.attributes.RESOLUTION.width === videoWidth
  })
  const fileName = createFileName(info, options.filePattern)
  downloadManifest(link.uri, resolvePath(path, fileName), false)
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
