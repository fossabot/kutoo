import yargs from 'yargs'
import { isUrl } from './utils'
import animekit from './index'
import { resolution, contentType } from './types'

const resolutionChoices: readonly resolution[] = ['uhd', 'fhd', 'hd', 'sd', 'low', 'ulow']
const contentChoices: readonly contentType[] = ['episode', 'season', 'page', 'chapter', 'volume']

const argv = yargs
  .scriptName('animekit')
  .usage('$0 url [options]')
  .wrap(yargs.terminalWidth())
  .options({
    resolution: {
      alias: 'r',
      description: 'The resolution of the video',
      choices: resolutionChoices,
      default: 'fhd'
    },
    content: {
      alias: 'c',
      description: 'What type of content you\'re trying to download',
      choices: contentChoices,
      default: 'episode'
    },
    out: {
      alias: 'o',
      description: 'Output directory, defaults to the current one',
      type: 'string',
      default: './'
    },
    dry: {
      alias: 'd',
      description: 'Output only info without downloading',
      type: 'boolean',
      default: false
    },
    pattern: {
      alias: 'p',
      description: 'File pattern for downloaded files',
      type: 'string',
      default: '<title>/<title>_Ep_<number>.<ext>'
    }
  })
  .demandCommand(1)
  .help()
  .alias('help', 'h')
  .version()
  .alias('version', 'v')
  .detectLocale(false).argv

const urls = argv._

for (const url of urls) {
  if (isUrl(url)) {
    doDownload(url, argv)
      .catch(err => {
        throw err
      })
  } else {
    console.log(`Error: '${url}' is not a valid url`)
    process.exit(1)
  }
}

async function doDownload (url: string, argv: any): Promise<void> {
  console.log('download')
  await animekit.download(url, argv.out, {
    filePattern: argv.pattern,
    resolution: argv.resolution,
    content: argv.content,
    subtitles: 'burned',
    subtitlesLang: 'en'
  })
}
