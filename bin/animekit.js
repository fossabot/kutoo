#!/usr/bin/env node
const yargs = require('yargs')
// const animekit = require('../dist/lib/index')

var argv = yargs
  .usage('$0 <url> [option]')
  .option('o', {
    alias: 'out',
    description:
      'File name for the video (if omited will be generated automatically)',
    type: 'string'
  })
  .option('d', {
    alias: 'dry',
    description: 'If true will output info without downloading'
  })
  .demandCommand(1)
  .help()
  .alias('h', 'help')
  .version()
  .alias('v', 'version').argv

var url = argv._[0]

console.log(url)

// if (options.output) {
// } else {
// }
