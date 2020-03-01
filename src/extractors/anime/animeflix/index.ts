import got from 'got'
import cheerio from 'cheerio'
// import { getDirectLink } from './helper'

import { createFileName, downloadFile } from '../../../utils'
import { EpisodeInfo, DownloadOptionsDefined } from '../../../types'

// async function getDirectLink (url: string): Promise<any> {
//   const response = await got(url)
//   const $ = cheerio.load(response.body)

//   const selector = url.substring(url.lastIndexOf('/') + 1) + ' > div'
//   const data = $(selector).attr('data-item')
//   if (data !== undefined) {
//     const parsedData = JSON.parse(data)
//     return parsedData.sources[0].src
//   }
// }

async function getInfo (url: string): Promise<EpisodeInfo> {
  const titleSelector = 'body > div.container.my-4 > div > div:nth-child(4) > ' +
        'div.col-lg-4.col-sm-12.custom-padding-bottom > div > div.card-body.bg-light-gray > p:nth-child(2)'

  const response = await got(url)
  const $ = cheerio.load(response.body)

  // const directUrl = $('#video-player > source').attr('src') ?? ''
  const episodeNumber = parseFloat($('a.btn-purple').text())
  const title = $(titleSelector).html() ?? ''

  const info: EpisodeInfo = {
    url: url,
    directUrlType: 'video',
    directUrls: {
      uhd: '',
      fhd: '',
      hd: '',
      sd: '',
      low: '',
      ulow: ''
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
async function download (url: string, path: string, options: DownloadOptionsDefined): Promise<void> {
  if (options.filePattern === undefined) {
    throw new Error()
  }
  const info = await getInfo(url)
  const fileName = createFileName(info, options.filePattern)
  await downloadFile(info.directUrls[options.resolution], path, fileName)
}

export default { download, getInfo }
