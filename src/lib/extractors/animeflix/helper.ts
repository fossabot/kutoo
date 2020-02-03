import got from 'got'
import cheerio from 'cheerio'

export async function getDirectLink(url: string) {
    const response = await got(url)
    const $ = cheerio.load(response.body)

    let selector = url.substring(url.lastIndexOf('/') + 1) + ' > div'
    let data = $(selector).attr('data-item')
    let parsedData = JSON.parse(data!)
    return parsedData.sources[0].src
}