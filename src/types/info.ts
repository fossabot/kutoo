import { resolution, subtitlesType } from './options'

export type seasonStatus = 'airing' | 'completed' | 'cancelled' | 'not aired' | 'unknown'
export type exts = 'mp4' | 'mkv'
export type allInfo = EpisodeInfo | SeasonInfo | PageInfo | ChapterInfo | VolumeInfo | Promise<EpisodeInfo> | Promise<SeasonInfo> | Promise<PageInfo> | Promise<ChapterInfo> | Promise<VolumeInfo>

export interface Info {
  url: string
  title: string
  number: number
  author: string | string[]
}

export interface EpisodeInfo extends Info{
  content: 'episode'
  directUrlType: 'manifest' | 'video'
  directUrls: {
    [key in resolution]: string | null
  }
  duration: number
  ext: exts
  subtitles: {
    type: subtitlesType | 'none'
    [key: string]: string
  }
}

export interface SeasonInfo extends Info {
  content: 'season'
  year: number
  studio: string
  status: seasonStatus
  episodesCount: number
  episodes: {
    [key: string]: {
      getInfo (): Promise<EpisodeInfo>
    }
  }
}

export interface PageInfo extends Info {
  content: 'page'
  directUrl: string
  ext: string
}
export interface ChapterInfo extends Info{
  content: 'chapter'
  url: string
  pagesCount: number
  pages: PageInfo[]
}

export interface VolumeInfo extends Info{
  content: 'volume'
  chaptersCount: number
  chapters: {
    [key: string]: {
      getInfo(): Promise<ChapterInfo>
    }
  }
}
