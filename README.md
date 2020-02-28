## __Warning!__
__This project is still at a very early stage, expect breaking change with update, code instability and many errors, if you decide to use this library please open a [issue](https://github.com/FedericoMorrone/animekit/issues) for any problem you might find__


# Animekit
![build](https://github.com/FedericoMorrone/animekit/workflows/ci/badge.svg)
[![npm version](https://badge.fury.io/js/animekit.svg)](https://badge.fury.io/js/animekit)
[![Downloads](https://img.shields.io/npm/dm/animekit.svg)](https://npmjs.com/animekit)
[![Coverage Status](https://coveralls.io/repos/github/FedericoMorrone/animekit/badge.svg?branch=master)](https://coveralls.io/github/FedericoMorrone/animekit?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![GitHub license](https://img.shields.io/github/license/FedericoMorrone/animekit)](https://github.com/FedericoMorrone/animekit/blob/master/LICENSE)



Animekit is an easy to use library to download anime and manga from various websites.
The main reason behind this project is to be able to consume anime and manga offline and without any intrussive ads or annoying popup.
A desktop gui written in electron is avaible [here](https://github.com/FedericoMorrone/animekit-desktop) while a mobile port can be found [here](https://github.com/FedericoMorrone/animekit-mobile)


## Install

Download a pre-compiled binary [here](https://github.com/FedericoMorrone/animekit/releases)

or

Install Animekit using [`yarn`](https://classic.yarnpkg.com/):

```bash
yarn add global animekit
```

with [`npm`](https://www.npmjs.com/):

```bash
npm install animekit -g
```
for more installation istructions check [INSTALLATION](INSTALLATION.md)

## Command line usage
```bash
animekit <url> -o <path>
```

## Pragmatic usage

Using animekit is very simple, just call the download function with a url and a path

```javascript
const animekit = require('animekit')

let url = 'https://www.crunchyroll.com/darling-in-the-franxx/episode-24-never-let-me-go-769621'
animekit.download(url, './videos')
```

To get the information about an episode you can use the info method

```javascript
let url = 'https://www.crunchyroll.com/darling-in-the-franxx/episode-24-never-let-me-go-769621'
let info = await animekit.getInfo(url)
```

This will return the following object 

```javascript
{
    //A url to the episode
    url: 'https://www.example.com/episode-1',
    // url to the video/playlist file
    directUrl: 'https://www.example.com/episode-1/video.mp4',
    //Links to sub files
    captions:{
        enUS: 'https://www.example.com/episode-1/sub/enUS.ass',
        itIT: 'https://www.example.com/episode-1/sub/itIT.ass'
    }
}
```

## Supported anime sites
* [Animeflix](https://animeflix.in/)
* [Animeunity](https://animeunity.it/)
* [Crunchyroll](https://www.crunchyroll.com/)

## Supported manga sites
* [Manganelo](https://manganelo.com/)
* [Mangareader](http://www.mangareader.net/)

## Todo

- [x] Add cli
- [x] Make cli properly work
- [ ] Add proper documentation
- [ ] Add support for more sites
- [ ] Complete this readme file
- [ ] Make [`gui`](https://github.com/FedericoMorrone/animekit-desktop) somewhat usable
