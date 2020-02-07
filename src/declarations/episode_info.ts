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