export type subtitlesType = 'burned' | 'embed' | 'external'
export type contentType = 'episode' | 'season' | 'page' | 'chapter' | 'volume'
export type resolution = 'uhd' | 'fhd' | 'hd' | 'sd' | 'low' | 'ulow'

export interface DownloadOptions {
  [key: string]: any
  content?: contentType
  subtitles?: subtitlesType
  subtitlesLang?: 'all' | 'en'
  filePattern?: string
  resolution?: resolution
}

export interface DownloadOptionsDefined {
  [key: string]: any
  content: contentType
  subtitles: subtitlesType
  subtitlesLang: 'all' | 'en'
  filePattern: string
  resolution: resolution
}
