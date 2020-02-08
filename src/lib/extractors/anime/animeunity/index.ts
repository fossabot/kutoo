import cheerio from 'cheerio';
import fs from 'fs';
import { resolve } from 'path'
import got from 'got'

import { getDirectLink } from './helper'

import * as d from '../../../../declarations'

function isCompatible(url: string) {
    let urlRegex = /^(http(s)?(:\/\/))?(www\.)?animeunity\.it(\/.*)?$/
    return urlRegex.test(url)
}

async function getEpisodeInfo(url: string) {
    let info: d.EpisodeInfo = {
        url: url,
        directUrl: await getDirectLink(url),
        captions: {}
    }

    return info
}

async function downloadEpisode(url: string, path: string, resolution: d.resolution, progressCallback?: (progress: any) => void) {
    const fileName = url.substring(url.lastIndexOf('/') + 1)

    path = resolve(path)

    await fs.promises.mkdir(path, { recursive: true })

    await got.stream(url)
        .on('downloadProgress', progress => {
            if (progressCallback) {
                progressCallback(progress)
            }
        })
        .pipe(fs.createWriteStream(path + '\\' + fileName))
}

function getEpisode(url: string) {
    let episode: d.Episode = {
        url: url,
        info: async () => {
            return await getEpisodeInfo(episode.url)
        },
        download: async (path, resolution, progressCallback) => {
            let info = await episode.info()
            await downloadEpisode(info.directUrl, path, resolution, progressCallback)
        }
    }

    return episode
}

async function getSeasons(url: string) {
    let titleSelector = 'body > div.container.my-4 > div > div:nth-child(4) > ' +
        'div.col-lg-4.col-sm-12.custom-padding-bottom > div > div.card-body.bg-light-gray > p:nth-child(2)'

    const response = await got(url)
    const $ = cheerio.load(response.body)

    let title = $(titleSelector).html()!.replace('<b>TITOLO: </b>', '').replace(/\s\s+/g, ' ').replace(/\s/, '')
    let links: string[] = []
    let episodes: d.Episode[] = []
    let seasons: d.Season[] = []

    $('.ep-box > a').each((i: number, el: CheerioElement) => {
        links.push(`https://www.animeunity.it/${$(el).attr('href')}`);
    });

    for (let i = 0; i < links.length; i++) {
        let episode = getEpisode(links[i])
        episodes.push(episode)
    }

    seasons[0] = {
        episodes: episodes,
        title: title
    }

    return seasons;
}


// async function updateLibrary() {
//     let response = await got(url)
// const $ = cheerio.load(response.body)

//     let links: any = {}
//     $('.archive-card').each((i: number, card: any) => {
//         let link = $(card).find('a').attr('href')
//         let title = $(card).find('.card-title > b').text()
//         links[title] = `https://www.animeunity.it/${link}`
//     });
//     return links
// }

export default { getSeasons, getEpisode, isCompatible }
