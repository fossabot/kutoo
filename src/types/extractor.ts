import { DownloadOptionsDefined, contentType } from './options'
import { EpisodeInfo, SeasonInfo } from './anime'
import { PageInfo, ChapterInfo, VolumeInfo } from './manga'

export type extractorType = 'anime' | 'manga'

export interface AnimeExtractor {
  download: (url: string, path: string, options: DownloadOptionsDefined) => Promise<void>
  getInfo(url: string, content: contentType): Promise<EpisodeInfo>
  getInfo(url: string, content: contentType): Promise<SeasonInfo>
}

export interface MangaExtractor {
  download: (url: string, path: string, options: DownloadOptionsDefined) => Promise<void>
  getInfo(url: string, content: contentType): Promise<PageInfo>
  getInfo(url: string, content: contentType): Promise<ChapterInfo>
  getInfo(url: string, content: contentType): Promise<VolumeInfo>
}

export interface ExtractorsArray {
  [key: string]: AnimeExtractor | MangaExtractor
}
