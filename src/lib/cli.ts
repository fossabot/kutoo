#!/usr/bin/env node
import yargs from 'yargs'
import { isUrl } from '../utils'
import animekit from '../lib'
import path from 'path'
import * as d from '../declarations'

var argv = yargs
    .usage('$0 <url> [option]')
    .option('p', {
        alias: 'playlist',
        description: 'Download playlist instead of single episode',
        type: 'boolean',
        default: false
    })
    .option('o', {
        alias: 'out',
        description:
            'Path to the video',
        type: 'string'
    })
    .option('d', {
        alias: 'dry',
        description: 'If true will output info without downloading',
        type: 'boolean',
        default: false
    })
    .demandCommand(1)
    .help()
    .alias('h', 'help')
    .version()
    .alias('v', 'version').argv

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
    let dest = path.resolve(argv.o) || path.resolve('.')
    await episode.download(dest, 'fhd', (progress) => {
        console.log(progress.percent)
    })
}