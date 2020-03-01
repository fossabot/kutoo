import { DownloadOptionsDefined } from './options'
import { EpisodeInfo, SeasonInfo } from './anime'
import { PageInfo, ChapterInfo, VolumeInfo } from './manga'

export interface AnimeExtractor {
  createEpisodeInfo (url: string): Promise<EpisodeInfo>
  createSeasonInfo (url: string): Promise<SeasonInfo>
  downloadEpisode (url: string, path: string, options: DownloadOptionsDefined): Promise<void>
  downloadSeason (url: string, path: string, options: DownloadOptionsDefined): Promise<void>
}

export interface MangaExtractor {
  createPageInfo (url: string): Promise<PageInfo>
  createChapterInfo (url: string): Promise<ChapterInfo>
  createVolumeinfo (url: string): Promise<VolumeInfo>
  downloadPage (url: string, path: string, options: DownloadOptionsDefined): Promise<void>
  downloadChapter (url: string, path: string, options: DownloadOptionsDefined): Promise<void>
  downloadVolume (url: string, path: string, options: DownloadOptionsDefined): Promise<void>
}

export interface ExtractorsArray {
  [key: string]: AnimeExtractor | MangaExtractor
}
