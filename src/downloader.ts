import { EpisodeInfo, DownloadOptionsDefined, SeasonInfo, PageInfo, ChapterInfo, VolumeInfo } from '@kutoo/types'
import * as pathModule from 'path'
import { downloadFile, createEpisodeFileName, downloadManifest } from '@kutoo/utils'

async function downloadEpisode (info: EpisodeInfo, path: string, options: DownloadOptionsDefined): Promise<void> {
  path = pathModule.resolve(process.cwd(), path)
  const url = info.directUrls[options.resolution] ?? 'fhd'
  const name = createEpisodeFileName(info, options.filePattern)
  if (info.directUrlType === 'video') {
    await downloadFile(url, path, name)
  } else if (info.directUrlType === 'manifest') {
    await downloadManifest(url, pathModule.resolve(path, name), options.ffmpeg)
  } else {
    throw new Error()
  }
}
async function downloadSeason (info: SeasonInfo, path: string, options: DownloadOptionsDefined): Promise<void> {

}
async function downloadPage (info: PageInfo, path: string, options: DownloadOptionsDefined): Promise<void> {

}
async function downloadChapter (info: ChapterInfo, path: string, options: DownloadOptionsDefined): Promise<void> {

}
async function downloadVolume (info: VolumeInfo, path: string, options: DownloadOptionsDefined): Promise<void> {

}

export default {
  downloadEpisode,
  downloadSeason,
  downloadPage,
  downloadChapter,
  downloadVolume
}
