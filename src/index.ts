import { DownloadOptions, contentType, EpisodeInfo, SeasonInfo, PageInfo, ChapterInfo, VolumeInfo } from './types'

import { selectExtractor } from './extractors'

import { defaults } from './defaults'

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

async function download (url: string, path: string, options?: DownloadOptions): Promise<void> {
  const opts = Object.assign(defaults, options)
  switch (opts.content) {
    case 'episode':
      await selectExtractor(url, opts.content).downloadEpisode(url, path, opts)
      break
    case 'season':
      await selectExtractor(url, opts.content).downloadSeason(url, path, opts)
      break
    case 'page':
      await selectExtractor(url, opts.content).downloadPage(url, path, opts)
      break
    case 'chapter':
      await selectExtractor(url, opts.content).downloadChapter(url, path, opts)
      break
    case 'volume':
      await selectExtractor(url, opts.content).downloadVolume(url, path, opts)
      break
  }
}

const animekit = { download, getInfo }

// Default export for typescript
export default animekit

// Exports for commonjs
module.exports = animekit
module.exports.default = animekit
