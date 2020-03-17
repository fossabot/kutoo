export interface PageInfo {
  url: string
  directUrl: string
  number: number
  ext: string
}
export interface ChapterInfo {
  title: string
  url: string
  pagesCount: number
  pages: Array<Promise<PageInfo>>
}

export interface VolumeInfo {
  title: string
  url: string
  chaptersCount: number
  author: string
  chapters: Array<Promise<ChapterInfo>>
}
