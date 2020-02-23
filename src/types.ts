export interface page {
    url: string
    directUrl: string
    pages: number
}
export interface ChapterInfo {
    url: string
    pages: page[]
}

export interface Chapter {
    url: string
    info(): Promise<ChapterInfo>
    download(
        path: string,
        progressCallback?: (progress: any) => void
    ): Promise<void>
}

export interface Volume {
    // title: string
    chapters: Chapter[]
}

export type resolution = 'uhd' | 'fhd' | 'hd' | 'sd' | 'low' | 'ulow'

export interface EpisodeInfo {
  url: string
  directUrl: string
  captions: {
    [key: string]: string
  }
}

export interface Episode {
  url: string
  info(): Promise<EpisodeInfo>
  download(
    path: string,
    resolution: resolution,
    progressCallback?: (progress: any) => void
  ): Promise<void>
}

export interface Season {
  title: string
  episodes: Episode[]
}