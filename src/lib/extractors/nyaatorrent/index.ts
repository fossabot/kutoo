import requestPromise from 'request-promise-native'
import cheerio from 'cheerio'

async function getLinks(url: string) {
    let links: string[] = [];
    const $ = await requestPromise.get({
        uri: url,
        transform: (body: any) => {
            return cheerio.load(body);
        }
    });
    $('#tv-seasons > div > div.les-content > a').each((i: number, el: any) => {
        links.push($(el).attr('href'));
    });
    return links;
}


async function getMagnets(url: string) {
    let magnets: any = {}

    const $ = await requestPromise.get({
        uri: url,
        transform: (body: any) => {
            return cheerio.load(body);
        }
    });

    $('tbody > tr > .relative > span').each((i: number, res: any) => {
        $('tbody > tr > .text-center > a').each((i: number, el: any) => {
            magnets[$(res).text()] = $(el).attr('href')
        });
    });

    return magnets
}

export default { getLinks, getMagnets }