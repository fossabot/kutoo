import cheerio from 'cheerio'
import got from 'got'
import { CookieJar } from 'tough-cookie'
import { Config } from './config'

import * as utils from '../../../utils'

export async function setLanguageCookie (lang: string): Promise<CookieJar> {
  const cookieJar = new CookieJar()

  const response = await got('https://www.crunchyroll.com/', { cookieJar })
  const $ = cheerio.load(response.body)

  const languageFunc = $('#footer_language_list > li:nth-child(1) > a').attr('onclick') ?? ''
  const tokenRegex = /(?<=').{43}(?=')/g
  const match = languageFunc.match(tokenRegex) ?? ''
  const token = match[0]

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

export async function getConfig (url: string): Promise<Config> {
  const response = await got(url)
  const config = utils.getStringBewtween(response.body, 'vilos.config.media = ', ']};', 2)
  return JSON.parse(config)
}
