import extractors from './extractors'
import * as d from 'declarations'

function getEpisode(url: string) {
    for (const animeExtractor of extractors.anime) {
        if (animeExtractor.isCompatible(url)) {
            return animeExtractor.getEpisode(url)
        }
    }
    return null
}

async function getSeasons(url: string) {
    for (const animeExtractor of extractors.anime) {
        if (animeExtractor.isCompatible(url)) {
            return animeExtractor.getSeasons(url)
        }
    }
    return null
}

async function getChapter(url: string) {
    for (const mangaExtractor of extractors.manga) {
        if (mangaExtractor.isCompatible(url)) {
            return mangaExtractor.getChapter(url)
        }
    }
    return null
}

async function getVolume(url: string) {
    for (const mangaExtractor of extractors.manga) {
        if (mangaExtractor.isCompatible(url)) {
            return mangaExtractor.getVolume(url)
        }
    }
    return null
}
export default { getEpisode, getSeasons, getChapter, getVolume }