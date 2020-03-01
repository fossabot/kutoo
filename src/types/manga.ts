export interface PageInfo {
  url: string
  directUrl: string
  number: number
}
export interface ChapterInfo {
  title?: string
  url: string
  pagesCount: number
  pages: Array<Promise<PageInfo>>
}

export interface VolumeInfo {
  title: string
  chaptersCount: number
  chapters: Array<Promise<ChapterInfo>>
}
