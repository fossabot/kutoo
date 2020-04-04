export type subtitlesType = 'burned' | 'embed' | 'external'
export type contentType = 'episode' | 'season' | 'page' | 'chapter' | 'volume'
export type resolution = 'uhd' | 'fhd' | 'hd' | 'sd' | 'low' | 'ulow'
export type numberResolution = [3840, 2160]|[1920, 1080]|[1280, 720]|[848, 480]|[640, 360]|[428, 240]

export interface DownloadOptions {
  content?: contentType
  subtitles?: subtitlesType
  subtitlesLang?: 'all' | 'en'
  filePattern?: string
  resolution?: resolution
  ffmpeg?: boolean
}

export interface DownloadOptionsDefined {
  content: contentType
  subtitles: subtitlesType
  subtitlesLang: 'all' | 'en'
  filePattern: string
  resolution: resolution
  ffmpeg: boolean
}
