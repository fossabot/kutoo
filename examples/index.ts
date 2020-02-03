import * as animekit from '../src/lib/animekit'
import fs from 'fs'

(async () => {

    // let url = 'https://www.animeunity.it/anime.php?id=571'
    // let url = 'https://www.crunchyroll.com/rwby/episode-10-out-in-the-open-792165'
    let url = 'https://www.crunchyroll.com/darling-in-the-franxx/episode-24-never-let-me-go-769621'


    let episode = animekit.getEpisode(url)
    let info = await episode!.info()
    console.log(info)
})()