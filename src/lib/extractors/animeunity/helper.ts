import cheerio from 'cheerio'
import got from 'got'


export async function getDirectLink(url: string) {
    const response = await got(url)
    const $ = cheerio.load(response.body)

    let src = $('#video-player > source').attr('src')!;
    return src
}