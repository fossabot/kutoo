import cheerio from 'cheerio';
import fs from 'fs';
import mkdirp from 'mkdirp';
import requestPromise from 'request-promise-native'
import request from 'request'

async function getLinks(id: number) {
    let links: string[] = [];
    const $ = await requestPromise({
        uri: `https://www.animeunity.it/anime.php?id=${id.toString()}`,
        transform: (body) => {
            return cheerio.load(body);
        }
    });
    $('.ep-box > a').each((i: number, el: any) => {
        links.push(`https://www.animeunity.it/${$(el).attr('href')}`);
    });
    return links;
}

async function downloadFromLink(link: string, path: string, progressCallback: (percentage: number, name: string) => void) {

    let titleSelector = 'body > div.container.my-4 > div > div:nth-child(4) > div.col-lg-4.col-sm-12.custom-padding-bottom > div > div.card-body.bg-light-gray > p:nth-child(2)'

    const $ = await requestPromise({
        uri: link,
        transform: (body) => {
            return cheerio.load(body);
        }
    });

    let title = $(titleSelector).html()!.replace('<b>TITOLO: </b>', '').replace(/\s\s+/g, ' ').replace(/\s/, '')

    let videoURL = $('#video-player > source').attr('src');

    let name = videoURL.split('/')[videoURL.split('/').length - 1]

    let videoName = videoURL.split('/')[videoURL.split('/').length - 1]
    path = `${path}/${title.slice(0, -1).replace(/[\\\\/:*?\"<>|]/g, '')}/`


    mkdirp(path, (err: Error) => {
        if (err) {
            console.error(err);
        }
    });

    let totalBytes = 0
    let receivedBytes = 0

    request(videoURL)
        .on('error',  (err) => {
            console.log(err);
        })
        .on('response', (data) => {
            totalBytes = parseInt(data.headers['content-length']);
        })
        .on('data',  (chunk) => {
            receivedBytes += chunk.length;
            let percentage = receivedBytes  / totalBytes;
            progressCallback(percentage * 100, name)
        })
        .pipe(fs.createWriteStream(path + videoName))
}

export default {getLinks, downloadFromLink}