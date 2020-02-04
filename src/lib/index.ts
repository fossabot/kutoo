import extractors from './extractors'
import * as d from 'declarations'

function getEpisode(url: string) {
    for (const extor of extractors) {
        if (extor.isCompatible(url)) {
            return extor.getEpisode(url)
        }
    }
    return null
}

async function getSeasons(url: string) {
    for (const extor of extractors) {
        if (extor.isCompatible(url)) {
            return extor.getSeasons(url)
        }
    }
    return null
}

export default { getEpisode, getSeasons }