import { resolution, subtitlesType } from './options'

export type exts = 'mp4'| 'mkv'

export interface EpisodeInfo {
    url: string
    directUrl: string
    resolution: resolution[]
    title: string
    name: string 
    number: number
    ext: exts
    subtitles: {
        type: subtitlesType | 'none'
        [key: string]: string
    }
}
