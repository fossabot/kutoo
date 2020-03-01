import { DownloadOptions, contentType, EpisodeInfo, SeasonInfo } from './types'

import { selectExtractor } from './extractors'

import { defaults } from './defaults'

async function download (url: string, path: string, options?: DownloadOptions): Promise<void> {
  const opts = Object.assign(defaults, options)
  const extractor = selectExtractor(url)
  if (extractor !== null) {
    await extractor.download(url, path, opts)
  } else {
    throw new Error()
  }
}

async function getInfo (url: string, content?: 0 | 'episode'): Promise<EpisodeInfo>
async function getInfo (url: string, content?: 1 | 'season'): Promise<SeasonInfo>
async function getInfo (url: string, content?: contentType): Promise<any> {
  content = content ?? defaults.content
  const extractor = selectExtractor(url)
  if (extractor !== null) {
    return extractor.getInfo(url, content)
  } else {
    throw new Error()
  }
}

const animekit = { download, getInfo }

// Default export for typescript
export default animekit

// Exports for commonjs
module.exports = animekit
module.exports.default = animekit
