import animeExtractors from './anime'
// import mangaExtractors from './manga'

import { getDomain } from '../utils'
//@ts-ignore
import * as sites from './sites.json'

function getExtractor(url: string) {
    // @ts-ignore
    const extractor: string =  sites[getDomain(url)!]
    return extractor.split('/')
}

export default { getExtractor, animeExtractors }