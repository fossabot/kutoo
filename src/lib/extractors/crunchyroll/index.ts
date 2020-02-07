import cheerio from 'cheerio'
import ffmpeg from 'fluent-ffmpeg'
import got from 'got'
import { Parser } from 'm3u8-parser'

import { setLanguageCookie, getConfig } from './helper'
import { downloadManifest } from '../../utils'
import { Config } from './config'

import * as d from '../../../declarations'

function isCompatible(url: string) {
    let urlRegex = /^(http(s)?(:\/\/))?(www\.)?crunchyroll\.com(\/.*)?$/
    return urlRegex.test(url)

}


async function getEpisodeInfo(url: string) {
    let info: d.EpisodeInfo = {
        url: url,
        directUrl: '',
        captions: {}
    }
    let config: Config = await getConfig(url)

    config.streams.forEach((stream) => {
        if (stream.format == 'multitrack_adaptive_hls_v2' && stream.hardsub_lang == null) {
            info.directUrl = stream.url
        }
    })

    config.subtitles.forEach((sub) => {
        info.captions[sub.language] = sub.url
    })

    return info
}


async function downloadEpisode(url: string, path: string, resolution: d.resolution, progressCallback?: (progress: any) => void) {
    let videoWidth: number
    let videoHeight: number

    switch (resolution) {
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
    // console.log(link.uri)
    downloadManifest(link.uri, path+ '/video.mp4', false)

}

function getEpisode(url: string) {
    let episode: d.Episode = {
        url: url,
        info: async () => {
            return await getEpisodeInfo(episode.url)
        },
        download: async (path, resolution, progressCallback) => {
            const info = await episode.info()
            await downloadEpisode(info.directUrl, path, resolution, progressCallback)
        }
    }

    return episode
}

async function getSeasons(url: string) {
    const langRegex = /(?<=\.com)(.*)(?=\/)/
    url = url.replace(langRegex, '')

    let cookieJar = await setLanguageCookie('enUS')

    const response = await got(url, { cookieJar })
    const $ = cheerio.load(response.body)

    let seasons: d.Season[] = []

    $('#showview_content_videos > ul > li').each((i: number, el: CheerioElement) => {
        let title = $(el).children('a').attr('title')!

        let episodes: d.Episode[] = []

        $(`#showview_content_videos > ul > li:has(a[title="${title}"]) > ul a`).each((i: number, el: CheerioElement) => {
            let link = 'https://www.crunchyroll.com' + $(el).attr('href')

            let episode = getEpisode(link)

            episodes.push(episode)
        })
        seasons[i] = {
            title: title,
            episodes: episodes
        }
    });

    return seasons
}






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

export default { getSeasons, getEpisode, isCompatible }