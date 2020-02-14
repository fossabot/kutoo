import animeExtractors from './anime'
import mangaExtractors from './manga'

const anime = new Set([
    animeExtractors.crunchyroll,
    animeExtractors.animeunity,
])

const manga = new Set([
    mangaExtractors.manganelo,
])


export default { anime, manga }