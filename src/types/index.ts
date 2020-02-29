export * from './options'
export * from './anime'
export * from './extractor'

export interface Page {
  url: string
  directUrl: string
  pages: number
}
export interface ChapterInfo {
  url: string
  pages: Page[]
}

export interface Chapter {
  url: string
  info(): Promise<ChapterInfo>
  download(
    path: string,
    progressCallback?: (progress: any) => void
  ): Promise<void>
}

export interface Volume {
  // title: string
  chapters: Chapter[]
}
