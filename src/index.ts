import crunchyroll from './crunchyroll'
import animeunity from './animeunity'
import nyaatorrent from './nyaatorrent'
import kickassanime from './kickassanime'

// (async () => {

//     // let seasons = await animekit.getEpisodes('https://www.crunchyroll.com/rwby', 'enUS')
//     // console.log(seasons)
//     // let config = await crunchyroll.getConfig('https://www.crunchyroll.com/rwby/episode-1-ruby-rose-643525')
//     // crunchyroll.downloadFromConfig(config, {
//     //     resolution: 'fhd',
//     //     hardsub: 'none',
//     //     path: './temp/eps'
//     // }, (progress)=>{
//     //     console.log(progress.percent)
//     // })

//     // let links = await animeunity.getLinks(571)
//     // console.log(links)
//     // await animeunity.downloadFromLink(links[0], './temp/eps', (percentage, name)=>{
//     //     console.log(name, percentage + '%')
//     // })

//     // let links = await nyaatorrent.getLinks('https://nyaatorrent.com/anime/endro')
//     // console.log(links)
//     // let magnets = await nyaatorrent.getMagnets(links[0])
//     // console.log(magnets)
// })()


export default {crunchyroll, animeunity, nyaatorrent, kickassanime}