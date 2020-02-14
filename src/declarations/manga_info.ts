export interface page {
    url: string
    directUrl: string
    pages: number
}
export interface ChapterInfo {
    url: string
    pages: page[]
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