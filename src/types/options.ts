export type subtitlesType = 'burned' | 'embed' | 'external'
export type contentType = 0 | 1 | 'episode' | 'season' | 'page' | 'chapter' | 'volume'
export type resolution = 'uhd' | 'fhd' | 'hd' | 'sd' | 'low' | 'ulow'

export interface downloadOptions {
  [key: string]: any
  content: contentType
  subtitles: subtitlesType
  subtitlesLang: 'all' | 'en'
  filePattern: string
  resolution: resolution
}
