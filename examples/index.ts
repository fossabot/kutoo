import animekit from '../src/lib/'
import fs from 'fs'

(async () => {

    // let url = 'https://www.animeunity.it/anime.php?id=571'
    // let url = 'https://www.crunchyroll.com/rwby/episode-10-out-in-the-open-792165'
    let url = 'https://watch.animeflix.in/video/135/#tabs-135-1-5'


    let episode = animekit.getEpisode(url)
    let info = await episode!.info()
    console.log(info)
})()