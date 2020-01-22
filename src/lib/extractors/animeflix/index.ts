import got from 'got'
import cheerio from 'cheerio'
import { getDirectLink } from './helper'

function isCompatible(url: string) {
    let urlRegex = /^(http(s)?(:\/\/))?(www\.)?(watch\.)?animeflix\.in(\/.*)?$/
    return urlRegex.test(url)

}

async function getEpisodeInfo(url: string) {
    let info: EpisodeInfo = {
        url: url,
        directUrl: await getDirectLink(url),
        captions: {}
    }

    return info
}

async function downloadEpisode(url: string, path: string, resolution: resolution, progressCallback: (progress: any) => void) {

}

function getEpisode(url: string) {
    let episode: Episode = {
        url: url,
        info: async () => {
            return await getEpisodeInfo(episode.url)
        },
        download: async (path, resolution, progressCallback) => {
            await downloadEpisode(episode.url, path, resolution, progressCallback)
        }
    }

    return episode
}

async function getSeasons(url: string) {

}

export default { getSeasons, getEpisode, isCompatible }
