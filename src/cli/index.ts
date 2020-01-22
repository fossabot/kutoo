const animekit = require('../lib')

const argv = require('yargs')
  .command(['download', '$0'], 'the default command', () => { }, (argv: any) => {
    let episode = animekit.getEpisode(argv)
  })
  .argv