import cheerio from 'cheerio';
import fs from 'fs';
import mkdirp from 'mkdirp';
import requestPromise from 'request-promise-native'
import request from 'request'

/**
 * Takes an id and return the correlated episodes links
 * @param id - A valid id from animeunity
 * @returns A promise with the episodes links
 */

async function getDirectLinks(url: string) {
    const $ = await requestPromise.get({
        uri: url,
        transform: (body) => {
            return cheerio.load(body);
        }
    });

    let src = $('#video-player > source').attr('src');
    return src
}

async function getInfo(url: string) {
    let info: any = {};
    let titleSelector = 'body > div.container.my-4 > div > div:nth-child(4) > ' +
        'div.col-lg-4.col-sm-12.custom-padding-bottom > div > div.card-body.bg-light-gray > p:nth-child(2)'

    const $ = await requestPromise.get({
        uri: url,
        transform: (body) => {
            return cheerio.load(body);
        }
    });

    let title = $(titleSelector).html()!.replace('<b>TITOLO: </b>', '').replace(/\s\s+/g, ' ').replace(/\s/, '')

    info = {
        name: title,
        description: '',
        seasons: {
            s1: {
                name: title,
                episodes: {

                }
            }
        },
    }

    $('.ep-box > a').each((i: number, el: CheerioElement) => {
        info.seasons['s1'].push(`https://www.animeunity.it/${$(el).attr('href')}`);
    });

    return info;
}







async function updateLibrary() {
    const $ = await requestPromise.get({
        uri: 'https://animeunity.it/anime.php?c=archive&page=*',
        transform: (body) => {
            return cheerio.load(body);
        }
    });

    let links: any = {}
    $('.archive-card').each((i: number, card: any) => {
        let link = $(card).find('a').attr('href')
        let title = $(card).find('.card-title > b').text()
        links[title] = `https://www.animeunity.it/${link}`
    });
    return links
}

export default { getInfo, updateLibrary }