import { getStringBewtween, isUrl, nthIndex, getDomain } from '../../src/utils/strings'

describe('getStringBewtween', ()=>{
    const originalString = 'const data={code:101};'
    it('returns the substring between two given strings', ()=>{
        expect(getStringBewtween(originalString, 'data=', ';')).toBe('{code:101}')
    })

    it('returns the substring between two given strings with the last character shifted', ()=>{
        expect(getStringBewtween(originalString, 'data=', '};', 1)).toBe('{code:101}')
    })
})

describe('isUrl', ()=>{
    const validUrl = 'https://www.example.com'
    const invalidUrl = 'notvalid.lol'
    it('returns true when given a valid url', ()=>{
        expect(isUrl(validUrl)).toBeTruthy()
    })
    it('returns false when given an invalid url', ()=>{
        expect(isUrl(invalidUrl)).toBeFalsy()
    })
})

describe('nthIndex', ()=>{
    const originalString = 'aaabbbccc'
    it('returns the index of the n occurance of string in a given strings', ()=>{
        expect(nthIndex(originalString, 'b', 3)).toBe(5)
    })
})

describe('getDomain', ()=>{
    const validUrl = 'https://www.example.com'
    const invalidUrl = 'notvalid.lol'
    it('returns the domain of a given valid url', ()=>{
        expect(getDomain(validUrl)).toBe('www.example.com')
    })

    it('throws an error when given an invalid url', ()=>{
        expect(() =>{
            getDomain(invalidUrl)
        }).toThrow()
    })
})