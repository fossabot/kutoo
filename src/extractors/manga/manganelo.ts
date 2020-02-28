// import got from 'got'
// import cheerio from 'cheerio'
// import fs from 'fs'

// import { nthIndex } from '../../../utils'

// import sanitize from 'sanitize-filename'

// async function getLinks (url: string): Promise<any> {
//   const links: string[] = []
//   const names: string[] = []
//   const response = await got(url)
//   const $ = cheerio.load(response.body)

//   const title = $('body > div.body-site > div.container.container-main > ' +
//         'div.container-main-left > div.panel-story-info > div.story-info-right > h1').text()

//   $('body > div.body-site > div.container.container-main >' +
//         'div.container-main-left > div.panel-story-chapter-list > ul > li > a').each((i: number, e: CheerioElement) => {
//     const name = $(e).text()
//     const src = $(e).attr('href') ?? ''
//     links.push(src)
//     names.push(name)
//   })
//   return {
//     title: title,
//     links: links.reverse(),
//     names: names.reverse()
//   }
// }

// async function getPages (url: string): Promise<string[]> {
//   const links: string[] = []
//   const response = await got(url)
//   const $ = cheerio.load(response.body)
//   $('body > div.body-site > div.container-chapter-reader > img').each((i: number, e: CheerioElement) => {
//     const src = $(e).attr('src') ?? ''
//     links.push(src)
//   })
//   return links
// }

// async function downlodPages (url: string, chapter: string, name: string): Promise<void> {
//   const links = await getPages(url)
//   for (const lnk of links) {
//     const fileName = lnk.substring(nthIndex(lnk, '/', 7) + 1)
//     const path = sanitize(name) + '/' + sanitize(chapter)
//     console.log(fileName, path)
//     await fs.promises.mkdir('./temp/' + path, { recursive: true })

//     await got.stream(lnk)
//       .pipe(fs.createWriteStream('./temp/' + path + '/' + fileName))
//   }
// }

// (async () => {
//   const url = 'https://manganelo.com/manga/jgfw265851564797003'
//   // let url = 'https://manganelo.com/manga/kono_subarashii_sekai_ni_shukufuku_o'
//   // let url = 'https://manganelo.com/manga/yovbxa13526492'
//   // let url = 'https://manganelo.com/manga/kimetsu_no_yaiba'
//   // let url = 'https://manganelo.com/manga/read_one_piece_manga_online_free4'

//   const links = await getLinks(url)
//   console.time('download')

//   for (let i = 0; i < links.links.length; i++) {
//     console.log(links.links[i], links.names[i], links.title)
//     await downlodPages(links.links[i], links.names[i], links.title)
//   }

//   console.timeEnd('download')
// })()

// export default { getChapter, getVolume, isCompatible }
