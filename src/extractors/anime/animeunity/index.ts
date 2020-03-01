import { createFileName, downloadFile } from '../../../utils'

import { createEpisodeInfo, createSeasonInfo } from './helper'

import { DownloadOptionsDefined, EpisodeInfo, SeasonInfo, contentType } from '../../../types'

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

async function downloadEpisode (url: string, path: string, options: DownloadOptionsDefined): Promise<void> {
  const info = await getInfo(url, 0)
  const fileName = createFileName(info, options.filePattern)
  await downloadFile(info.directUrl, path, fileName)
}

async function download (url: string, path: string, options: DownloadOptionsDefined): Promise<void> {
  switch (options.content) {
    case 0: case 'episode':
      await downloadEpisode(url, path, options)
      break
    case 1: case 'season':
      for (const episode of (await createSeasonInfo(url)).episodes) {
        await downloadEpisode((await episode).url, path, options)
      }
      break
    default:
      throw new Error()
  }
}

export default { download, getInfo }
