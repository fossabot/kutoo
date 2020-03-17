import { resolution, subtitlesType } from './options'

export type seasonStatus = 'airing' | 'completed' | 'cancelled' | 'not aired' | 'unknown'
export type exts = 'mp4' | 'mkv'

export interface EpisodeInfo {
  url: string
  directUrlType: 'manifest' | 'video'
  directUrls: {
    [key in resolution]: string
  }
  resolution: resolution[]
  title: string
  duration: number
  name: string
  number: number
  ext: exts
  subtitles: {
    type: subtitlesType | 'none'
    [key: string]: string
  }
}

export interface SeasonInfo {
  url: string
  name: string
  year: number
  studio: string
  status: seasonStatus
  episodesCount: number
  episodes: Array<Promise<EpisodeInfo>>
}
