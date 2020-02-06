

# Animekit
[![Build Status](https://travis-ci.com/FedericoMorrone/animekit.svg?branch=development)](https://travis-ci.com/FedericoMorrone/animekit)
[![npm version](https://badge.fury.io/js/animekit.svg)](https://badge.fury.io/js/animekit)
[![Downloads](https://img.shields.io/npm/dm/animekit.svg)](https://npmjs.com/animekit)
[![GitHub license](https://img.shields.io/github/license/FedericoMorrone/animekit)](https://github.com/FedericoMorrone/animekit/blob/master/LICENSE)

Animekit is an easy to use library to download anime and manga from various websites.
The main reason behind this project is to be able to consume anime and manga offline and without any intrussive ads or annoying popup.
A desktop gui written in electron is avaible [`here`](https://github.com/FedericoMorrone/animekit-desktop)


## Getting Started

Install Animekit using [`yarn`](https://classic.yarnpkg.com/):

```bash
yarn add global animekit
```

Or [`npm`](https://www.npmjs.com/):

```bash
npm install animekit -g
```

Then you can just do

```bash
animekit <url> -o <path>
```

## Pragmatic usage

To download an episode you first need to create an episode object

```javascript
const animekit = require('animekit')

let url = 'https://www.crunchyroll.com/darling-in-the-franxx/episode-24-never-let-me-go-769621'
let episode = animekit.getEpisode(url)
```

Then you can call the download method of that object by specifing a location to download it and resolution

```javascript
episode.download('./anime' , 'fhd')
```

You can also track the progress with a callback function

```javascript
episode.download('./anime' , 'fhd', (progress) => {
    console.log(progress.percent)
})
```

To get the information about an episode you can use the info method

```javascript
let info = episode.info()
```

This will return the following object 

```javascript
{
    //A url to the episode
    url: 'https://www.example.com/episode-1',
    // url to the video/playlist file
    directUrl: 'https://www.example.com/episode-1/video.mp4',
    //Links to captions files
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


## Todo

- [ ] Add cli
- [ ] Add proper documentation
- [ ] Add support for more sites
- [ ] Complete this readme file
- [ ] Make [`gui`](https://github.com/FedericoMorrone/animekit-desktop) somewhat usable
