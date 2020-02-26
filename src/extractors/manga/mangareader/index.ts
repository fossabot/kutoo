// import got from 'got'
// import cheerio from 'cheerio'
// import fs from 'fs'
// import sanitize from 'sanitize-filename'

// import { nthIndex } from '../../../utils'

// function isCompatible (url: string) {
//   return true
// }

// async function getChapterInfo (url: string) {

// }
// async function getChapter (url: string) {
//   // let chapter: d.Chapter = {
//   //     url: url,

//   // }
// }

// async function getVolume (url: string) {

// }

// async function getLinks (url: string) {
//   const links: string[] = []
//   const names: string[] = []
//   let title: string
//   const response = await got(url)
//   const $ = cheerio.load(response.body)

//   title = $('#mangaproperties > table > tbody > tr:nth-child(1) > td:nth-child(2) > h2').text()

//   $('#listing > tbody > tr > td > a').each((i: number, e: CheerioElement) => {
//     const href = 'http://www.mangareader.net' + $(e).attr('href')
//     const name = $(e).text()
//     links.push(href)
//     names.push(name)
//   })

//   return {
//     links: links,
//     names: names,
//     title: title
//   }
// }

// async function getPages (url: string) {
//   const pages: string[] = []
//   try {
//     const $ = cheerio.load((await got(url)).body)
//     $('#pageMenu > option').each((i: number, e: CheerioElement) => {
//       const page = 'http://www.mangareader.net' + $(e).attr('value')
//       pages.push(page)
//     })

//     for (const page in pages) {
//       try {
//         const $page = cheerio.load((await got(pages[page])).body)
//         pages[page] = $page('#img').attr('src')!
//       } catch (error) {

//       }
//     }
//   } catch (error) {

//   }

//   return pages
// }

// async function downlodPages (url: string, chapter: string, name: string) {
//   const links = await getPages(url)
//   console.log(links)
//   for (const lnk in links) {
//     const fileName = lnk + '.jpg'
//     const path = sanitize(name) + '/' + sanitize(chapter)
//     console.log(fileName, path)
//     await fs.promises.mkdir('./temp/' + path, { recursive: true })

//     await got.stream(links[lnk])
//       .pipe(fs.createWriteStream('./temp/' + path + '/' + fileName))
//   }
// }

// (async () => {
//   // let url = 'http://www.mangareader.net/new-game'
//   const url = 'http://www.mangareader.net/assassination-classroom'
//   const links = await getLinks(url)
//   console.time('download')

//   for (let i = 0; i < links.links.length; i++) {
//     console.log(links.links[i], links.names[i], links.title)
//     await downlodPages(links.links[i], links.names[i], links.title)
//   }

//   console.timeEnd('download')
// })()
