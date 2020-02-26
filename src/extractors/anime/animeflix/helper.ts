import got from 'got'
import cheerio from 'cheerio'

export async function getDirectLink (url: string): Promise<any> {
  const response = await got(url)
  const $ = cheerio.load(response.body)

  const selector = url.substring(url.lastIndexOf('/') + 1) + ' > div'
  const data = $(selector).attr('data-item')
  if (data !== undefined) {
    const parsedData = JSON.parse(data)
    return parsedData.sources[0].src
  }
}
