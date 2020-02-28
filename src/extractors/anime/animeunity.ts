import cheerio from 'cheerio'
// import fs from 'fs'
// import { resolve as resolvePath } from 'path'
import got from 'got'

import { createFileName, downloadFile } from '../../utils'

import { downloadOptionsDefined, EpisodeInfo } from '../../types'

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

async function getSeasonLinks (url: string): Promise<string[]> {
  const response = await got(url)
  const $ = cheerio.load(response.body)

  const links: string[] = []

  $('.ep-box > a').each((i: number, el: CheerioElement) => {
    // eslint-disable-next-line
    const href = $(el).attr('href')!
    links.push(`https://www.animeunity.it/${href}`)
  })
  return links
}

async function getInfo (url: string): Promise<EpisodeInfo> {
  const titleSelector = 'body > div.container.my-4 > div > div:nth-child(4) > ' +
        'div.col-lg-4.col-sm-12.custom-padding-bottom > div > div.card-body.bg-light-gray > p:nth-child(2)'

  const response = await got(url)
  const $ = cheerio.load(response.body)

  const directUrl = $('#video-player > source').attr('src') ?? ''
  const episodeNumber = parseFloat($('a.btn-purple').text())
  const title = $(titleSelector).html() ?? ''
    .replace('<b>TITOLO: </b>', '')
    .replace(/\s\s+/g, ' ')
    .replace(/\s/, '')

  const info: EpisodeInfo = {
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

async function download (url: string, path: string, options: downloadOptionsDefined): Promise<void> {
  if (options.content === 0 || options.content === 'episode') {
    const info = await getInfo(url)
    const fileName = createFileName(info, options.filePattern)
    await downloadFile(info.directUrl, path, fileName)
  } else if (options.content === 1 || options.content === 'season') {
    const links = await getSeasonLinks(url)
    for (const lnk of links) {
      const info = await getInfo(lnk)
      const fileName = createFileName(info, options.filePattern)
      await downloadFile(info.directUrl, path, fileName)
    }
  } else {
    throw new Error()
  }
}

export default { download, getInfo }
