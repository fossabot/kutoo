import { extractorType } from '../types'

interface sites {
  [key: string]: {
    type: extractorType
    extractor: string
  }
}

export const sites: sites = {
  '9anime.to': {
    type: 'anime',
    extractor: '9anime'
  },
  'animeflix.in': {
    type: 'anime',
    extractor: 'animeflix'
  },
  'animeunity.it': {
    type: 'anime',
    extractor: 'animeunity'
  },
  'mangadex.org': {
    type: 'anime',
    extractor: 'mangadex'
  },
  'nhentai.net': {
    type: 'manga',
    extractor: 'nhentai'
  },
  'www.animeunity.it': {
    type: 'anime',
    extractor: 'animeunity'
  },
  'www.crunchyroll.com': {
    type: 'anime',
    extractor: 'crunchyroll'
  }
}
