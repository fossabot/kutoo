import {isUrl} from '../../src/utils'

describe('given a string', ()=>{
    const validUrl = 'https://www.example.com'
    const invalidUrl = 'notvalid.lol'
    test('if it\'s a valid url return true', ()=>{
        expect(isUrl(validUrl)).toBeTruthy()
    })

    test('if it\'s not a valid url return false', ()=>{
        expect(isUrl(invalidUrl)).toBeFalsy()
    })
})