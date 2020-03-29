import { program } from 'commander'
// import { isUrl } from '@animekit/utils'
// import animekit from './index'
// import { resolution, contentType } from '@animekit/types'
import { version, name } from '../package.json'

// const resolutionChoices: readonly resolution[] = ['uhd', 'fhd', 'hd', 'sd', 'low', 'ulow']
// const contentChoices: readonly contentType[] = ['episode', 'season', 'page', 'chapter', 'volume']

program
  .name(name)
  .version(version)
  .option('-r, --resolution', 'The resolution of the video', 'fhd')
  .option('-c, --content', 'What type of content you\'re trying to download', 'episode')
  .option('-o, --out', 'Output directory, defaults to the current one', './')
  .option('-d, --dry', 'Output only info without downloading', false)
  .option('-p, --pattern', 'File pattern for downloaded files', '<title>/<title>_Ep_<number>.<ext>')

program
  .command('download <url>', { isDefault: true })
  .action(url => {
    console.log(url)
  })

if (process.argv.length < 3) {
  program.help()
}

program.parse(process.argv)

// for (const url of urls) {
//   if (isUrl(url)) {
//     doDownload(url, argv)
//       .catch(err => {
//         throw err
//       })
//   } else {
//     console.log(`Error: '${url}' is not a valid url`)
//     process.exit(1)
//   }
// }

// async function doDownload (url: string, argv: any): Promise<void> {
//   console.log('download')
//   await animekit.download(animekit.getInfo(url), argv.out, {
//     filePattern: argv.pattern,
//     resolution: argv.resolution,
//     content: argv.content,
//     subtitles: 'burned',
//     subtitlesLang: 'en'
//   })
// }
