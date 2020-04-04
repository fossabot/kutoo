## __Warning!__
__This project is still at a very early stage, expect breaking change with update, code instability and many errors, if you decide to use this library please open a [issue](https://github.com/FedericoMorrone/kutoo/issues) for any problem you might find__


# kutoo
![build](https://github.com/FedericoMorrone/kutoo/workflows/ci/badge.svg)
[![npm version](https://badge.fury.io/js/kutoo.svg)](https://badge.fury.io/js/kutoo)
[![codecov](https://codecov.io/gh/FedericoMorrone/kutoo/branch/master/graph/badge.svg)](https://codecov.io/gh/FedericoMorrone/kutoo)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Known Vulnerabilities](https://snyk.io/test/github/FedericoMorrone/kutoo/badge.svg?targetFile=package.json)](https://snyk.io/test/github/FedericoMorrone/kutoo?targetFile=package.json)
[![GitHub license](https://img.shields.io/github/license/FedericoMorrone/kutoo)](https://github.com/FedericoMorrone/kutoo/blob/master/LICENSE) 



kutoo is an easy to use library to download anime and manga from various websites.
The main reason behind this project is to be able to consume anime and manga offline and without any intrussive ads or annoying popup.
A desktop gui written in electron is avaible [here](https://github.com/FedericoMorrone/kutoo-desktop) while a mobile port can be found [here](https://github.com/FedericoMorrone/kutoo-mobile)


## Install

Download a pre-compiled binary [here](https://github.com/FedericoMorrone/kutoo/releases)

or

Install kutoo using [`yarn`](https://classic.yarnpkg.com/):

```bash
yarn add global kutoo
```

with [`npm`](https://www.npmjs.com/):

```bash
npm install kutoo -g
```
for more installation istructions check [INSTALLATION](INSTALLATION.md)

## Command line usage
```bash
kutoo <url> -o <path>
```

## Pragmatic usage

Using kutoo is very simple, just call the download function with a url and a path

```javascript
const kutoo = require('kutoo')

const url = 'https://www.legitstreaming.com/anime/bokunopico'
kutoo.download(url, './videos')
```

To get the information about an episode you can use the info method

```javascript
const url = 'https://www.legitstreaming.com/anime/bokunopico'
const info = await kutoo.getInfo(url)
```

This will return an EpisodeInfo object that looks like the following

```javascript
{
  url: 'https://www.legitstreaming.com/anime/bokunopico',
  directUrl: 'https://files.legitstreaming.com/animes/bokunopico/3.mp4',
  resolution: ['fhd', 'hd'],
  title: 'Boku no Pico',
  name: 'Boku no Pico Episode 3',
  number: 3,
  ext: 'mp4',
  subtitles: {
    type: 'burned'
  }
}

```

## Supported anime sites
* [Animeflix](https://animeflix.in/)
* [Animeunity](https://animeunity.it/)
* [Crunchyroll](https://www.crunchyroll.com/)

## Supported manga sites
* [Mangadex](https://mangadex.org/)
* [Nhentai](http://nhentai.net/)

## Todo

- [x] Add cli
- [x] Make cli properly work
- [ ] Add proper documentation
- [ ] Add support for more sites
- [ ] Complete this readme file
- [ ] Make [`gui`](https://github.com/FedericoMorrone/kutoo-desktop) somewhat usable
