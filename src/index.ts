import { DownloadOptions, contentType, EpisodeInfo, SeasonInfo, PageInfo, ChapterInfo, VolumeInfo, allInfo } from './types'

import { selectExtractor } from './extractors'

import { defaults } from './defaults'

import downloader from './downloader'

async function getInfo (url: string, content?: 'episode'): Promise<EpisodeInfo>
async function getInfo (url: string, content?: 'season'): Promise<SeasonInfo>
async function getInfo (url: string, content?: 'page'): Promise<PageInfo>
async function getInfo (url: string, content?: 'chapter'): Promise<ChapterInfo>
async function getInfo (url: string, content?: 'volume'): Promise<VolumeInfo>
async function getInfo (url: string, content?: contentType): Promise<any> {
  content = content ?? defaults.content
  let info: any
  switch (content) {
    case 'episode':
      info = await selectExtractor(url, content).createEpisodeInfo(url)
      break
    case 'season':
      info = await selectExtractor(url, content).createSeasonInfo(url)
      break
    case 'page':
      info = await selectExtractor(url, content).createPageInfo(url)
      break
    case 'chapter':
      info = await selectExtractor(url, content).createChapterInfo(url)
      break
    case 'volume':
      info = await selectExtractor(url, content).createVolumeinfo(url)
      break
  }
  return info
}

async function download (info: allInfo, path: string, options?: DownloadOptions): Promise<void> {
  const opts = Object.assign(defaults, options)
  info = await Promise.resolve(info)
  switch (info.content) {
    case 'episode':
      await downloader.downloadEpisode(info, path, opts)
      break
    case 'season':
      await downloader.downloadSeason(info, path, opts)
      break
    case 'page':
      await downloader.downloadPage(info, path, opts)
      break
    case 'chapter':
      await downloader.downloadChapter(info, path, opts)
      break
    case 'volume':
      await downloader.downloadVolume(info, path, opts)
      break
  }
}

const kutoo = { download, getInfo }

// Default export for typescript
export default kutoo

// Exports for commonjs
module.exports = kutoo
module.exports.default = kutoo
