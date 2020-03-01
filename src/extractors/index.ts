import animeExtractors from './anime'
import mangaExtractors from './manga'

import { getDomain } from '../utils'
import { animeSites, mangaSites } from './sites'
import { AnimeExtractor, MangaExtractor, contentType } from '../types'

export function selectExtractor (url: string, content: 'episode' | 'season'): AnimeExtractor
export function selectExtractor (url: string, content: 'page' | 'chapter' | 'volume'): MangaExtractor
export function selectExtractor (url: string, content: contentType): any {
  if (content === 'episode' || content === 'season') {
    const extractorName = animeSites[getDomain(url)]
    return animeExtractors[extractorName]
  } else if (content === 'page' || content === 'chapter' || content === 'volume') {
    const extractorName = mangaSites[getDomain(url)]
    return mangaExtractors[extractorName]
  } else {
    return null
  }
}
