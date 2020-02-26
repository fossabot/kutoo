import ffmpeg from 'fluent-ffmpeg'
import got from 'got'
import { Parser } from 'm3u8-parser'

import { resolve as resolvePath } from 'path'

import { setLanguageCookie, getConfig } from './helper'
import { downloadManifest, createFileName } from '../../../utils'
import { Config } from './config'

import { EpisodeInfo, downloadOptions } from '../../../types'

async function getInfo(url: string) {
    let config: Config = await getConfig(url)

    let info: EpisodeInfo = {
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
        if (stream.format == 'multitrack_adaptive_hls_v2' && stream.hardsub_lang == null) {
            info.directUrl = stream.url
        }
    })

    config.subtitles.forEach((sub) => {
        info.subtitles[sub.language] = sub.url
    })

    return info
}


async function download(url: string, path: string, options: downloadOptions) {
    let info = await getInfo(url)
    let videoWidth: number
    let videoHeight: number

    switch (options.resolution) {
        case 'fhd': case 'uhd':
            videoWidth = 1920
            videoHeight = 1080
            break;
        case 'hd':
            videoWidth = 1280
            videoHeight = 720
            break;
        case 'sd':
            videoWidth = 848
            videoHeight = 480
            break;
        case 'low':
            videoWidth = 640
            videoHeight = 360
            break;
        case 'ulow':
            videoWidth = 428
            videoHeight = 240
            break;
        default:
            break;
    }

    let parser = new Parser()
    let response = await got(url)
    let streamUrl = response.body
    parser.push(streamUrl)
    parser.end()
    let mainPlaylist = parser.manifest

    let link = mainPlaylist.playlists.find((playlist: any) => {
        return playlist.attributes.RESOLUTION.height === videoHeight &&
            playlist.attributes.RESOLUTION.width === videoWidth
    })
    const fileName = createFileName(info, options.filePattern!)
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






async function downloadFromConfig(config: any, options: { resolution: string, hardsub: any, path?: string }, progressCallback?: (progress: any) => void) {

    if (options.hardsub === 'none') {
        options.hardsub = null
    }
    const { resolution, hardsub, path } = options
    let videoWidth: number
    let videoHeight: number
    let streamType = 'multitrack_adaptive_hls_v2'

    let name = `${path}/${config.metadata.episode_uri.split('/')[3].replace(/\-/g, '_')}` +
        `_ep_${('00' + config.metadata.episode_number).slice(-3)} - ` +
        `${config.metadata.title.replace(/\//g, '')}.mp4`

    switch (resolution) {
        case 'fhd':
            videoWidth = 1920
            videoHeight = 1080
            break;
        case 'hd':
            videoWidth = 1280
            videoHeight = 720
            break;
        case 'sd':
            videoWidth = 848
            videoHeight = 480
            break;
        case 'low':
            videoWidth = 640
            videoHeight = 360
            break;
        case 'ulow':
            videoWidth = 428
            videoHeight = 240
            break;
        default:
            break;
    }

    let stream = config.streams.find((stream: any) => {
        return stream.format === streamType && stream.hardsub_lang === hardsub
    })

    let parser = new Parser()
    let response = await got(stream.url)
    let streamUrl = response.body
    parser.push(streamUrl)
    parser.end()
    let mainPlaylist = parser.manifest

    let link = mainPlaylist.playlists.find((playlist: any) => {
        return playlist.attributes.RESOLUTION.height === videoHeight &&
            playlist.attributes.RESOLUTION.width === videoWidth
    })
    console.log(link.uri)
    let command = ffmpeg(link.uri)
        .outputOptions([
            '-c copy',
            '-vcodec copy'
        ])
        .output(name)
        .on('progress', (progress) => {
            if (progressCallback != undefined) {
                progressCallback(progress)
            }
        })
        .on('end', (err, stdout, stderr) => {
            console.log('Finished processing', err, stdout, stderr);
        });

    command.run()
}

export default { download, getInfo }