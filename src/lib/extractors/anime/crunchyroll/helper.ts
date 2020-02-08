import cheerio from 'cheerio'
import got from 'got'
import { CookieJar } from 'tough-cookie'

import * as utils from '../../../utils'




export async function setLanguageCookie(lang: string) {
    const cookieJar = new CookieJar();

    const response = await got('https://www.crunchyroll.com/', { cookieJar })
    const $ = cheerio.load(response.body)

    let languageFunc = $('#footer_language_list > li:nth-child(1) > a').attr('onclick')!
    let tokenRegex = /(?<=\').{43}(?=\')/g
    let token = languageFunc.match(tokenRegex)![0]

    await got.post('https://www.crunchyroll.com/ajax/', {
        form: {
            req: 'RpcApiTranslation_SetLang',
            locale: lang,
            _token: token
        },
        cookieJar: cookieJar
    })

    return cookieJar
}

export async function getConfig(url: string) {
    let response = await got(url)
    let config = utils.getStringBewtween(response.body, 'vilos.config.media = ', ']};', 2)
    return JSON.parse(config)
}
