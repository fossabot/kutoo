import { EpisodeInfo, SeasonInfo, PageInfo, ChapterInfo, VolumeInfo } from './info'

export interface AnimeExtractor {
  createEpisodeInfo (url: string): Promise<EpisodeInfo>
  createSeasonInfo (url: string): Promise<SeasonInfo[]>
}

export interface MangaExtractor {
  createPageInfo (url: string): Promise<PageInfo>
  createChapterInfo (url: string): Promise<ChapterInfo>
  createVolumeinfo (url: string): Promise<VolumeInfo>
}

export interface ExtractorsArray {
  [key: string]: AnimeExtractor | MangaExtractor
}
