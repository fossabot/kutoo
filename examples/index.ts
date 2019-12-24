import animekit from '../src'

(async () => {
    // let url = 'https://crunchyroll.com/rwby'
    // let episodes = await animekit.crunchyroll.getEpisodes(url)
    // console.log(episodes)

    // let id = 571
    // let episodes = await animekit.animeunity.getLinks(id)
    // console.log(episodes)
    
    let url = 'https://nyaatorrent.com/anime/endro'
    let episodes = await animekit.nyaatorrent.getLinks(url)
    console.log(episodes)
})()

