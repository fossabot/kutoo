import extractors from './extractors'

function getEpisode(url: string) {
    for (const extor of extractors) {
        if (extor.isCompatible(url)) {
            return extor.getEpisode(url)
        }
    }
}

async function getSeasons(url: string) {
    for (const extor of extractors) {
        if (extor.isCompatible(url)) {
            return extor.getSeasons(url)
        }
    }
}

export { getEpisode, getSeasons }