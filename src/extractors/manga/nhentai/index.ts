// import got from 'got'
// import cheerio from 'cheerio'

// import { downloadFile, createFileName } from '../../utils'
// import { DownloadOptions, PageInfo, ChapterInfo, VolumeInfo } from '../../types'
// // import fs from 'fs'

// async function getPages (url: string) {
//   const links = []
//   const response = await got(url)
//   const $ = cheerio.load(response.body)

//   const pageNumber = $('#content > section.pagination > a.last').attr('href')!.replace('?page=', '')
//   for (let i = 1; i <= parseInt(pageNumber); i++) {
//     const link = `${url}?page=${i}`
//     links.push(link)
//   }
//   return links
// }

// async function getLinks (url: string) {
//   const response = await got(url)
//   const $ = cheerio.load(response.body)

//   const title = $('#info > h1').text()
//   const sauce = url.split('/').pop()

//   const pages: string[] = []

//   $('#thumbnail-container > div > a').each((i: number, e: CheerioElement) => {
//     const page = 'https://nhentai.net' + $(e).attr('href')
//     pages.push(page)
//   })

//   return { links: pages, title: title, sauce: sauce }
// }

// async function getDirect (url: string) {
//   const response = await got(url)
//   const $ = cheerio.load(response.body)

//   const img = $('#image-container > a > img').attr('src')!
//   console.log(img)
//   return img
// }

// // (async () => {
// //   const url = 'https://nhentai.net/g/263576'
// //   const links = await getLinks(url)

// //   const title = sanitize(links.title)
// //   const sauce = links.sauce

// //   for (const lnk of links.links) {
// //     const src = await getDirect(lnk)
// //     await downloadFile(src, `./temp/${sauce}`)
// //   }
// // })()
// async function getInfo (url: string): Promise<PageInfo | ChapterInfo | VolumeInfo> {
// }

// async function download (url: string, path: string, options: DownloadOptions): Promise<void> {
//   switch (options.content) {
//     case 0: case 'page':
//       break
//     case 1: case 'season':
//       break
//     case 'volume':
//       break
//     default:
//       throw new Error()
//   }
// }

// export default { download, getInfo }

export default {}
