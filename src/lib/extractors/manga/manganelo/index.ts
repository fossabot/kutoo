import got from 'got'
import cheerio from 'cheerio'
import fs, { link } from 'fs'

function replaceInvaldChars(str: string, v?: string) {
    if (!v) {
        v = ''
    }
    return str.replace(/[\~\#\%\&\*\{\}\\\:\<\>\?\/\+\|]/g, v);
}

function nthIndex(str: string, pat: string, n: number) {
    var L = str.length, i = -1;
    while (n-- && i++ < L) {
        i = str.indexOf(pat, i);
    }
    return i;
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
        let path = replaceInvaldChars(name) + '/' + replaceInvaldChars(chapter)
        console.log(fileName, path)
        await fs.promises.mkdir('./temp/' + path, { recursive: true })

        await got.stream(lnk)
            .pipe(fs.createWriteStream('./temp/' + path + '/' + fileName))
    }
}

(async () => {
    let url = 'https://manganelo.com/manga/jgfw265851564797003'
    let links = await getLinks(url)
    console.time('start download')

    for (let i = 0; i < links.links.length; i++) {
        console.log(links.links[i], links.names[i], links.title)
        await downlodPages(links.links[i], links.names[i], links.title)
    }

    console.timeEnd('start download')
})()
