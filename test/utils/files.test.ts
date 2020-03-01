import { createFileName } from '../../src/utils/files'
import {EpisodeInfo} from '../../src/types'

// import nock from 'nock'

// nock('http://api.domain.com')
//   .get('/file.json')
//   .replyWithFile(200, __dirname + '/replies/user.json', {
//     'Content-Type': 'application/json',
//   })

describe('createFileName', ()=>{
    const info: EpisodeInfo = {
        url: '',
        directUrlType: 'video',
        directUrls:{
            uhd: '',
            fhd:'',
            hd:'',
            sd:'',
            low:'',
            ulow:''
        },
        resolution: ['fhd'],
        title: 'Amazing Anime',
        name: 'Best Episode',
        number: 1,
        ext: 'mp4',
        subtitles: {
            type: 'burned'
        }
    }
    const pattern = '<title>_ep_<number>_<name>.<ext>'
    it('returns a filename from a given pattern', ()=>{
        expect(createFileName(info, pattern)).toBe('AmazingAnime_ep_1_BestEpisode.mp4')
    })

    it('returns a filename from a given pattern lowercase', ()=>{
        expect(createFileName(info, pattern, true)).toBe('amazinganime_ep_1_bestepisode.mp4')
    })
})