import got from 'got'
import cheerio from 'cheerio'

async function getLinks(url: string) {
    let links: string[] = [];
    const response = await got(url)
    const $ = cheerio.load(response.body)

    $('#tv-seasons > div > div.les-content > a').each((i: number, el: any) => {
        links.push($(el).attr('href')!);
    });
    return links;
}


async function getMagnets(url: string) {
    let magnets: any = {}

    const response = await got(url)
    const $ = cheerio.load(response.body)

    $('tbody > tr > .relative > span').each((i: number, res: any) => {
        $('tbody > tr > .text-center > a').each((i: number, el: any) => {
            magnets[$(res).text()] = $(el).attr('href')
        });
    });

    return magnets
}

export default { getLinks, getMagnets }