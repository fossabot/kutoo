import extractors from './extractors'

import { downloadOptions } from './types'

const defaults: downloadOptions = {
    content: 0,
    filePattern: '<title>_ep_<number>_<name>.<ext>'
}

async function download(url: string, path: string, options?: downloadOptions) {
    const opts = Object.assign(defaults, options)
    const extractorInfo = extractors.getExtractor(url)
    if (!extractorInfo) {
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

async function getInfo(url: string) {
    const extractorInfo = extractors.getExtractor(url)
    if (!extractorInfo) {
        throw new Error(`No extractor found for ${url}`)
    }
    const extractorType = extractorInfo[0]
    const extractor = extractorInfo[1]
    if (extractorType === 'anime') {
        return extractors.animeExtractors[extractor].getInfo(url)
    } else if (extractorType === 'manga') {
        // return extractors.mangaExtractors[extractor].getInfo(url)
    }
}
// Default export for typescript
export default { download, getInfo }

// Exports for commonjs
module.exports = { download, getInfo };
module.exports.default = { download, getInfo };