import got from 'got'
import cheerio from 'cheerio'
import fs from 'fs'

import { nthIndex } from '../../../utils'

import * as d from '../../../types'
import sanitize from 'sanitize-filename'

function isCompatible(url: string) {
    return true
}

async function getChapterInfo(url: string) {

}
async function getChapter(url: string) {
    // let chapter: d.Chapter = {
    //     url: url,

    // }
}

async function getVolume(url: string) {

}


async function getLinks(url: string) {
    let links: string[] = []
    let names: string[] = []
    let title: string
    const response = await got(url)
    const $ = cheerio.load(response.body)

    title = $('body > div.body-site > div.container.container-main > ' +
        'div.container-main-left > div.panel-story-info > div.story-info-right > h1').text()

    $('body > div.body-site > div.container.container-main >' +
        'div.container-main-left > div.panel-story-chapter-list > ul > li > a').each((i: number, e: CheerioElement) => {
            let name = $(e).text()
            let src = $(e).attr('href')!
            links.push(src)
            names.push(name)
        })
    return {
        title: title,
        links: links.reverse(),
        names: names.reverse()
    }
}

async function getPages(url: string) {
    let links: string[] = []
    const response = await got(url)
    const $ = cheerio.load(response.body)
    $('body > div.body-site > div.container-chapter-reader > img').each((i: number, e: CheerioElement) => {
        let src = $(e).attr('src')!
        links.push(src)
    })
    return links
}

async function downlodPages(url: string, chapter: string, name: string) {
    let links = await getPages(url)
    for (const lnk of links) {
        let fileName = lnk.substring(nthIndex(lnk, '/', 7) + 1)
        let path = sanitize(name) + '/' + sanitize(chapter)
        console.log(fileName, path)
        await fs.promises.mkdir('./temp/' + path, { recursive: true })

        await got.stream(lnk)
            .pipe(fs.createWriteStream('./temp/' + path + '/' + fileName))
    }
}

(async () => {
    let url = 'https://manganelo.com/manga/jgfw265851564797003'
    // let url = 'https://manganelo.com/manga/kono_subarashii_sekai_ni_shukufuku_o'
    // let url = 'https://manganelo.com/manga/yovbxa13526492'
    // let url = 'https://manganelo.com/manga/kimetsu_no_yaiba'
    // let url = 'https://manganelo.com/manga/read_one_piece_manga_online_free4'

    let links = await getLinks(url)
    console.time('download')

    for (let i = 0; i < links.links.length; i++) {
        console.log(links.links[i], links.names[i], links.title)
        await downlodPages(links.links[i], links.names[i], links.title)
    }

    console.timeEnd('download')
})()

export default { getChapter, getVolume, isCompatible }