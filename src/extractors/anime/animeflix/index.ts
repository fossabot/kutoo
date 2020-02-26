import got from 'got'
import cheerio from 'cheerio'
// import { getDirectLink } from './helper'

import { createFileName, downloadFile } from '../../../utils'
import { EpisodeInfo, downloadOptionsDefined } from '../../../types'

async function getInfo (url: string): Promise<EpisodeInfo> {
  const titleSelector = 'body > div.container.my-4 > div > div:nth-child(4) > ' +
        'div.col-lg-4.col-sm-12.custom-padding-bottom > div > div.card-body.bg-light-gray > p:nth-child(2)'

  const response = await got(url)
  const $ = cheerio.load(response.body)

  const directUrl = $('#video-player > source').attr('src') ?? ''
  const episodeNumber = parseFloat($('a.btn-purple').text())
  const title = $(titleSelector).html() ?? ''

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
  const info = await getInfo(url)
  const fileName = createFileName(info, options.filePattern)
  await downloadFile(info.directUrl, path, fileName)
}

export default { download, getInfo }
