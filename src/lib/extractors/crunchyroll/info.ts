interface info {
    title: string;
    description: string;
    tags: string[];
    publisher: string,
    seasons: [
        {
            title: 'season1',
            episodes: [
                {
                    title: 'episode title',
                    description: '',
                    url: 'site.com/ep',
                    directLink: 'site.com/down/ep'
                }
            ]
        },
        {
            title: 'season2',
            episodes: [
                {
                    title: 'episode title',
                    url: 'site.com/ep',
                    directLink: 'site.com/down/ep'
                }
            ]
        }
    ]
}

export interface episodeInfo {
    title: string;
    description: string;
    url: string;
    directLink: string;
}