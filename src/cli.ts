import { program } from 'commander'
import { isUrl, isDir } from '@kutoo/utils'
// import fs from 'fs'
// import kutoo from './index'
// import { resolution, contentType } from '@kutoo/types'
// import { version, name } from '../package.json'

// const resolutionChoices: readonly resolution[] = ['uhd', 'fhd', 'hd', 'sd', 'low', 'ulow']
// const contentChoices: readonly contentType[] = ['episode', 'season', 'page', 'chapter', 'volume']

program
  .name('kutoo')
  .version('0.0.1')
  // .storeOptionsAsProperties()

program
  .option('-r, --resolution', 'The resolution of the video', 'fhd')
  .option('-c, --content', 'What type of content you\'re trying to download', 'episode')
  .option('-o, --out', 'Output directory, defaults to the current one', './')
  .option('-d, --dry', 'Output only info without downloading', false)
  .option('-n, --name <string>', 'Name of the output file', 'output')
  .option('-p, --pattern', 'File pattern for downloaded files', '<title>/<title>_Ep_<number>.<ext>')

program
  .command('download <url>', { isDefault: true })
  .action(url => {
    console.log(url)
  })

program
  .command('pdf <url>')
  .action(async url => {
    if (isUrl(url)) {

    } else if (await isDir(url)) {
      // createPdf(url, program.opts().out, program.opts().name)
      console.log(url, program.opts().out, program.opts().name)
    }
  })

if (process.argv.length < 3) {
  program.help()
}

program.parseAsync(process.argv).catch(err => console.error(err))

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
//   await kutoo.download(kutoo.getInfo(url), argv.out, {
//     filePattern: argv.pattern,
//     resolution: argv.resolution,
//     content: argv.content,
//     subtitles: 'burned',
//     subtitlesLang: 'en'
//   })
// }
