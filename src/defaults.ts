import { DownloadOptionsDefined } from './types'

export const defaults: DownloadOptionsDefined = {
  content: 'episode',
  filePattern: '<title>_ep_<number>_<name>.<ext>',
  subtitles: 'embed',
  subtitlesLang: 'all',
  resolution: 'fhd'
}
