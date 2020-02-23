import got from 'got'
import cheerio from 'cheerio'
import sanitize from 'sanitize-filename'

import { downloadFile } from '../../../utils'
// import fs from 'fs'

async function getPages(url: string) {
    let links = []
    const response = await got(url)
    const $ = cheerio.load(response.body)


    let pageNumber = $('#content > section.pagination > a.last').attr('href')!.replace('?page=', '')
    for (let i = 1; i <= parseInt(pageNumber); i++) {
        let link = `${url}?page=${i}`
        links.push(link)
    }
    return links
}

async function getLinks(url: string) {
    const response = await got(url)
    const $ = cheerio.load(response.body)

    let title = $('#info > h1').text()
    let sauce = url.split('/').pop()

    let pages: string[] = []

    $('#thumbnail-container > div > a').each((i: number, e: CheerioElement) => {
        let page = 'https://nhentai.net' + $(e).attr('href')
        pages.push(page)
    })

    return { links: pages, title: title, sauce: sauce }
}

async function getDirect(url: string) {
    const response = await got(url)
    const $ = cheerio.load(response.body)

    let img = $('#image-container > a > img').attr('src')!
    console.log(img)
    return img
}

(async () => {
    let url = 'https://nhentai.net/g/263576'
    let links = await getLinks(url)

    let title = sanitize(links.title)
    let sauce = links.sauce

    for (const lnk of links.links) {
        let src = await getDirect(lnk)
        await downloadFile(src, `./temp/${sauce}`)
    }
})()