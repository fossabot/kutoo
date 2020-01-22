type resolution = 'uhd' | 'fhd' | 'hd' | 'sd' | 'low' | 'ulow'



interface EpisodeInfo {
    url: string
    directUrl: string
    captions: {
        [key: string]: string
    }
}

interface Episode {
    url: string
    info(): Promise<EpisodeInfo>
    download(path: string, resolution: resolution, progressCallback: (progress: any) => void): Promise<void>
}

interface Season {
    title: string
    episodes: Episode[]
}
