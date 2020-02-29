import extractors from './extractors'

import { downloadOptions } from './types'

const defaults: downloadOptions = {
  content: 0,
  filePattern: '<title>_ep_<number>_<name>.<ext>',
  subtitles: 'embed',
  subtitlesLang: 'all',
  resolution: 'fhd'
}

async function download (url: string, path: string, options?: downloadOptions): Promise<void> {
  const opts = Object.assign(defaults, options)
  const extractorInfo = extractors.getExtractor(url)
  if (extractorInfo === null) {
    throw new Error(`No extractor found for ${url}`)
  }
  const extractorType = extractorInfo[0]
  const extractor = extractorInfo[1]
  if (extractorType === 'anime') {
    await extractors.animeExtractors[extractor].download(url, path, opts)
  } else if (extractorType === 'manga') {
    // extractors.mangaExtractors[extractor].download(url, path)
  }
}

async function getInfo (url: string): Promise<any> {
  const extractorInfo = extractors.getExtractor(url)
  if (extractorInfo === null) {
    throw new Error(`No extractor found for ${url}`)
  }
  const extractorType = extractorInfo[0]
  const extractor = extractorInfo[1]
  if (extractorType === 'anime') {
    await extractors.animeExtractors[extractor].getInfo(url)
  } else if (extractorType === 'manga') {
    // await extractors.mangaExtractors[extractor].getInfo(url)
  }
}

const animekit = { download, getInfo }

// Default export for typescript
export default animekit

// Exports for commonjs
module.exports = animekit
module.exports.default = animekit
