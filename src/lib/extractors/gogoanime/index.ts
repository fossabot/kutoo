import got from 'got'
import cheerio from 'cheerio'

async function getDownloadPage(url: string) {
    const response = await got(url)
    const $ = cheerio.load(response.body)

    let src = 'https:' + $('iframe').attr('src')
    console.log(src.replace('streaming.php', 'download'))
}

async function getFullUrl(url: string) {
    const response = await got(url)
    const $ = cheerio.load(response.body)

    var ep_start = $('#episode_page a.active').attr('ep_start');
    var ep_end = $('#episode_page a.active').attr('ep_end');
    var id = $("input#movie_id").val();
    var default_ep = $("input#default_ep").val();
    var alias = $("input#alias_anime").val();
    var fullUrl = `https://ajax.apimovie.xyz/ajax/load-list-episode?ep_start=${ep_start}&ep_end=${ep_end}&id=${id}&default_ep=${default_ep}&alias${alias}`;
    return fullUrl
}

async function getLinks(url: string) {

    let fullUrl = await getFullUrl(url)

    let links: string[] = [];
    const response = await got(fullUrl)
    const $ = cheerio.load(response.body)

    $('#episode_related > li > a').each((i: number, el: any) => {
        links.push(`https://gogoanime.video${$(el).attr('href')!.replace(/\s/, '')}`);
    });

    return links.reverse()
}

async function getDownloadLinks(url: string) {

}
export default { getLinks, getDownloadLinks, }