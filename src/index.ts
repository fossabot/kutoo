import extractors from './extractors'

type content = 0 | 'episode' | 'season' | 'page' | 'chapter' | 'volume'
interface downloadOptions {
    contentType?: content
    subtitles?: 'all' | 'en' | 'fr' | 'it'
    filePattern?: string
}

const defaults: downloadOptions = {
    contentType: 0,
    filePattern: '<number>_<title>_<name>.<ext>'
}

function download(url: string, path: string, options?: downloadOptions) {
    const opts = Object.assign(defaults, options)
    const extractorInfo = extractors.getExtractor(url)
    const extractorType = extractorInfo[0]
    const extractor = extractorInfo[1]
    if (extractorType === 'anime') {
        //@ts-ignore
        extractors.animeExtractors[extractor].download(url, path)
    } else if (extractorType === 'manga') {
        //@ts-ignore
        extractors.mangaExtractors[extractor].download(url, path)
    }
}

function getInfo(url: string, options?: downloadOptions) {
    const opts = Object.assign(defaults, options)
    const extractorInfo = extractors.getExtractor(url)
    const extractorType = extractorInfo[0]
    const extractor = extractorInfo[1]
    if (extractorType === 'anime') {
        //@ts-ignore
        return extractors.animeExtractors[extractor].getInfo(url)
    } else if (extractorType === 'manga') {
        //@ts-ignore
        return extractors.mangaExtractors[extractor].getInfo(url)
    }
}

download('https://www.animeunity.it/anime.php?id=571', './temp')
// download('https://nhentai.net/g/263576')

export default { download, getInfo }