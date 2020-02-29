import { DownloadOptions } from './options'
import { EpisodeInfo } from './anime'

export interface Extractor {
  download: (url: string, path: string, options: DownloadOptions) => Promise<void>
  getInfo: (url: string) => Promise<EpisodeInfo>
}

export interface ExtractorsArray {
  [key: string]: Extractor
}
