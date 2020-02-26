import cheerio from 'cheerio';
import fs from 'fs';
import { resolve as resolvePath } from 'path'
import got from 'got'

import { createFileName, downloadFile } from '../../../utils'

import { downloadOptions, EpisodeInfo, resolution } from '../../../types'

// async function getSeasons(url: string) {
//     let titleSelector = 'body > div.container.my-4 > div > div:nth-child(4) > ' +
//         'div.col-lg-4.col-sm-12.custom-padding-bottom > div > div.card-body.bg-light-gray > p:nth-child(2)'

//     const response = await got(url)
//     const $ = cheerio.load(response.body)

//     let title = $(titleSelector).html()!.replace('<b>TITOLO: </b>', '').replace(/\s\s+/g, ' ').replace(/\s/, '')
//     let links: string[] = []
//     let episodes: d.Episode[] = []
//     let seasons: d.Season[] = []

//     $('.ep-box > a').each((i: number, el: CheerioElement) => {
//         links.push(`https://www.animeunity.it/${$(el).attr('href')}`);
//     });

//     for (let i = 0; i < links.length; i++) {
//         let episode = getEpisode(links[i])
//         episodes.push(episode)
//     }

//     seasons[0] = {
//         episodes: episodes,
//         title: title
//     }

//     return seasons;
// }
async function getInfo(url: string) {

    let titleSelector = 'body > div.container.my-4 > div > div:nth-child(4) > ' +
        'div.col-lg-4.col-sm-12.custom-padding-bottom > div > div.card-body.bg-light-gray > p:nth-child(2)'


    const response = await got(url)
    const $ = cheerio.load(response.body)

    let directUrl = $('#video-player > source').attr('src')!;
    let episodeNumber = parseFloat($('a.btn-purple').text())
    let title = $(titleSelector).html()!
        .replace('<b>TITOLO: </b>', '')
        .replace(/\s\s+/g, ' ')
        .replace(/\s/, '')


    let info: EpisodeInfo = {
        url: url,
        directUrl: directUrl,
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
async function download(url: string, path: string, options: downloadOptions) {

    let info = await getInfo(url)
    const fileName = createFileName(info, options.filePattern!)

    await downloadFile(info.directUrl, path, fileName)
}


export default { download, getInfo }
