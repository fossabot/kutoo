import animeExtractors from './anime'
import mangaExtractors from './manga'

import { getDomain } from '../utils'
import { sites } from './sites'
import { AnimeExtractor, MangaExtractor } from '../types'

export function selectExtractor (url: string): AnimeExtractor | MangaExtractor | null {
  const extractorInfo = sites[getDomain(url)]
  if (extractorInfo === undefined) {
    return null
  }
  if (extractorInfo.type === 'anime') {
    return animeExtractors[extractorInfo.extractor]
  } else if (extractorInfo.type === 'manga') {
    return mangaExtractors[extractorInfo.extractor]
  } else {
    return null
  }
}
