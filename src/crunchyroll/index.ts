import cheerio from 'cheerio'
import ffmpeg from 'fluent-ffmpeg'
import { Parser } from 'm3u8-parser'
import requestPromise from 'request-promise-native'

async function setLanguageCookie(lang: string) {
    let cookieJar = requestPromise.jar();

    const $ = await requestPromise({
        uri: 'https://www.crunchyroll.com/',
        jar: cookieJar,
        transform: (body) => {
            return cheerio.load(body);
        }
    });

    let languageFunc = $('#footer_language_list > li:nth-child(1) > a').attr('onclick')
    let tokenRegex = /(?<=\').{43}(?=\')/g
    let token = languageFunc.match(tokenRegex)[0]

    await requestPromise({
        uri: 'https://www.crunchyroll.com/ajax/',
        method: 'post',
        jar: cookieJar,
        formData: {
            req: "RpcApiTranslation_SetLang",
            locale: lang,
            _token: token
        }
    })

    return cookieJar
}

async function getEpisodes(url: string) {
    const langRegex = /(?<=\.com)(.*)(?=\/)/
    const gUrl = 'https://www.crunchyroll.com'
    const anime = url.replace(langRegex, '')

    let cookieJar = await setLanguageCookie('enUS')
    let seasons: any = {}

    const $ = await requestPromise({
        uri: anime,
        jar: cookieJar,
        transform: (body) => {
            return cheerio.load(body);
        }
    });

    $('#showview_content_videos > ul > li').each((i: number, el: CheerioElement) => {
        let title: string = $(el).children('a').attr('title')

        let links: string[] = []

        $(`#showview_content_videos > ul > li:has(a[title="${title}"]) > ul a`).each((i: number, el: CheerioElement) => {
            links.push(gUrl + $(el).attr('href'))
        })

        seasons[title] = links.reverse()
    });
    return seasons
}

async function getConfig(url: string) {
    let configRegex = /(?<=vilos.config.media\s=\s)(.*)(?=;)/

    let data = await requestPromise(url)
    let config = data.match(configRegex)
    let parsedConfig = JSON.parse(config[0])
    parsedConfig.metadata.episode_uri = url
    return parsedConfig
}

async function downloadFromConfig(config: any, options: { resolution: string, hardsub: string, path?: string }, progressCallback?: (progress: any) => void) {

    if (options.hardsub === 'none') {
        options.hardsub = null
    }
    const { resolution, hardsub, path} = options
    let videoWidth: number
    let videoHeight: number
    let streamType = 'multitrack_adaptive_hls_v2'

    let name = `${path}/${config.metadata.episode_uri.split('/')[3].replace(/\-/g, '_')}` +
        `_ep_${('00' + config.metadata.episode_number).slice(-3)} - ` +
        `${config.metadata.title.replace(/\//g, '')}.mp4`

    switch (resolution) {
        case 'fhd':
            videoWidth = 1920
            videoHeight = 1080
            break;
        case 'hd':
            videoWidth = 1280
            videoHeight = 720
            break;
        case 'sd':
            videoWidth = 848
            videoHeight = 480
            break;
        case 'low':
            videoWidth = 640
            videoHeight = 360
            break;
        case 'ulow':
            videoWidth = 428
            videoHeight = 240
            break;
        default:
            break;
    }

    let stream = config.streams.find((stream: any) => {
        return stream.format === streamType && stream.hardsub_lang === hardsub
    })

    let parser = new Parser()
    let streamUrl = await requestPromise(stream.url)
    parser.push(streamUrl)
    parser.end()
    let mainPlaylist = parser.manifest

    let link = mainPlaylist.playlists.find((playlist: any) => {
        return playlist.attributes.RESOLUTION.height === videoHeight &&
            playlist.attributes.RESOLUTION.width === videoWidth
    })
    console.log(link.uri)
    let command = ffmpeg(link.uri)
        .outputOptions([
            '-c copy',
            '-vcodec copy'
        ])
        .output(name)
        .on('progress', (progress) => {
            if (progressCallback != undefined) {
                progressCallback(progress)
            }
        })
        .on('end', (err, stdout, stderr) => {
            console.log('Finished processing', err, stdout, stderr);
        });

    command.run()
}

export default { getEpisodes, getConfig, downloadFromConfig }

