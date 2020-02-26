import animeExtractors from './anime'
// import mangaExtractors from './manga'

import { getDomain } from '../utils'
import { sites } from './sites'

function getExtractor(url: string) {
    const extractor: string = sites[getDomain(url)]
    if (!extractor) {
        return null
    }
    return extractor.split('/')
}

export default { getExtractor, animeExtractors }