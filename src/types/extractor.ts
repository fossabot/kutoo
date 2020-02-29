import { downloadOptions } from './options'
import { EpisodeInfo } from './episode'

export interface extractor {
  download: (url: string, path: string, options: downloadOptions) => Promise<void>
  getInfo: (url: string) => Promise<EpisodeInfo>
}

export interface extractorArray {
  [key: string]: extractor
}
