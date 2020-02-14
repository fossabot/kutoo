import yargs from 'yargs'
import { isUrl } from './utils'
import animekit from '../lib'
import path from 'path'
import * as d from '../declarations'

const resolution: ReadonlyArray<d.resolution> = ['uhd', 'fhd', 'hd', 'sd', 'low', 'ulow']
var argv = yargs
    .usage('animekit <url> [options]')
    .wrap(null)
    .option('m', {
        alias: 'manga',
        description: 'Download a manga',
        type: 'boolean',
        default: false
    })
    .option('r', {
        alias: 'resolution',
        description: 'The resolution of the video',
        choices: resolution
    })
    .option('s', {
        alias: ['season', 'volume'],
        description: 'Download whole season/volume instead of single episode/chapter',
        type: 'boolean',
        default: false
    })
    .option('o', {
        alias: 'out',
        description:
            'Output directory, defaults to the current one',
        type: 'string',
        default: '.'
    })
    .option('d', {
        alias: 'dry',
        description: 'Output only info without downloading',
        type: 'boolean',
        default: false
    })
    .demandCommand(1)
    .help()
    .alias('h', 'help')
    .version()
    .alias('v', 'version')
    .detectLocale(false).argv

var url = argv._[0]

if (isUrl(url)) {
    console.log(url)
    doDownload(url, argv)
} else {
    console.log(`Error: '${url}' is not a valid url`)
    process.exit(1)
}

async function doDownload(url: string, argv: any) {
    let episode = await animekit.getEpisode(url)
    if (!episode) {
        process.exit(1)
    }
    let info = await episode.info()
    let dest = path.resolve(argv.o)
    await episode.download(dest, 'fhd', (progress) => {
        console.log(progress.percent)
    })
}