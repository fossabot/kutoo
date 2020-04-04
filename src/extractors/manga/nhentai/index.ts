// import got from 'got'
// import cheerio from 'cheerio'

// import { MangaExtractor, DownloadOptionsDefined, PageInfo, ChapterInfo, VolumeInfo } from '../../../types'
// import { downloadFile, createPageFileName } from '../../../utils'
// // import fs from 'fs'

// import * as pathModule from 'path'

// async function createPageInfo (url: string): Promise<PageInfo> {
//   console.log(url, 'page info')

//   const response = await got(url)
//   const $ = cheerio.load(response.body)

//   const img = $('#image-container > a > img').attr('src') ?? ''

//   const info: PageInfo = {
//     url: url,
//     directUrl: img,
//     ext: 'jpg',
//     // eslint-disable-next-line
//     number: Math.random() * 100
//   }

//   return info
// }
// async function createChapterInfo (url: string): Promise<ChapterInfo> {
//   console.log(url, 'chapter info')
//   const response = await got(url)
//   const $ = cheerio.load(response.body)

//   const title = $('#info > h1').text()
//   const links: string[] = []

//   $('#thumbnail-container > div > a').each((i: number, e: CheerioElement) => {
//     const lnk = `https://nhentai.net${$(e).attr('href') ?? ''}`
//     links.push(lnk)
//   })
//   const info: ChapterInfo = {
//     url: url,
//     title: title,
//     pagesCount: 0,
//     pages: links.map(async lnk => await createPageInfo(lnk))
//   }

//   return info
// }
// async function createVolumeinfo (url: string): Promise<VolumeInfo> {
//   console.log(url)

//   const response = await got(url)
//   const $ = cheerio.load(response.body)

//   const title = $('#info > h1').text()
//   const links: string[] = []

//   $('#thumbnail-container > div > a').each((i: number, e: CheerioElement) => {
//     const lnk = `https://nhentai.net${$(e).attr('href') ?? ''}`
//     links.push(lnk)
//   })
//   const info: VolumeInfo = {
//     url: url,
//     title: title,
//     author: '',
//     chaptersCount: 0,
//     chapters: links.map(async lnk => await createChapterInfo(lnk))
//   }

//   return info
// }
// async function downloadPage (url: string, path: string, options: DownloadOptionsDefined): Promise<void> {
//   const info = await createPageInfo(url)
//   await downloadFile(info.directUrl, path, createPageFileName(info, options.filePattern))
// }
// async function downloadChapter (url: string, path: string, options: DownloadOptionsDefined): Promise<void> {
//   const info = await createChapterInfo(url)
//   for (const page of info.pages) {
//     const pageInfo = await page
//     await downloadPage(pageInfo.url, pathModule.join(path, info.title), options)
//   }
// }
// async function downloadVolume (url: string, path: string, options: DownloadOptionsDefined): Promise<void> {
//   const info = await createVolumeinfo(url)
//   for (const chap of info.chapters) {
//     const chapInfo = await chap
//     await downloadChapter(chapInfo.url, pathModule.join(path, info.title), options)
//   }
// }

// const nhentai: MangaExtractor = {
//   createPageInfo,
//   createChapterInfo,
//   createVolumeinfo,
//   downloadPage,
//   downloadChapter,
//   downloadVolume
// }

// export default nhentai
