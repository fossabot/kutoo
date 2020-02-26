import { downloadOptionsDefined } from './options'
import { EpisodeInfo } from './episode'

export interface extractor {
  [key: string]: Function
  download: (url: string, path: string, options: downloadOptionsDefined) => Promise<void>
  getInfo: (url: string) => Promise<EpisodeInfo>
}
