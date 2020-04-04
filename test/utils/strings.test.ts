import { getStringBewtween, isUrl, nthIndex, getDomain, switchResolution } from '../../src/utils/strings'

describe('getStringBewtween', () => {
  const originalString = 'const data={code:101};'
  it('returns the substring between two given strings', () => {
    expect(getStringBewtween(originalString, 'data=', ';')).toBe('{code:101}')
  })

  it('returns the substring between two given strings with the last character shifted', () => {
    expect(getStringBewtween(originalString, 'data=', '};', 1)).toBe('{code:101}')
  })
})

describe('isUrl', () => {
  const validUrl = 'https://www.example.com'
  const invalidUrl = 'notvalid.lol'
  it('returns whether or not a given url is valid', () => {
    expect(isUrl(validUrl)).toBeTruthy()
    expect(isUrl(invalidUrl)).toBeFalsy()
  })
})

describe('nthIndex', () => {
  const originalString = 'aaabbbccc'
  it('returns the index of the n occurance of string in a given strings', () => {
    expect(nthIndex(originalString, 'b', 3)).toBe(5)
  })
})

describe('getDomain', () => {
  const validUrl = 'https://www.example.com'
  const invalidUrl = 'notvalid.lol'
  it('returns the domain of a given valid url', () => {
    expect(getDomain(validUrl)).toBe('www.example.com')
  })

  it('throws an error when given an invalid url', () => {
    expect(() => {
      getDomain(invalidUrl)
    }).toThrow()
  })
})

describe('switchresolution', () => {
  it('Returns the array representation of a resolution string', () => {
    expect(switchResolution('uhd')).toStrictEqual([3840, 2160])
    expect(switchResolution('fhd')).toStrictEqual([1920, 1080])
    expect(switchResolution('hd')).toStrictEqual([1280, 720])
    expect(switchResolution('sd')).toStrictEqual([848, 480])
    expect(switchResolution('low')).toStrictEqual([640, 360])
    expect(switchResolution('ulow')).toStrictEqual([428, 240])
  })
  it('Returns the string representation of a resolution array', () => {
    expect(switchResolution([3840, 2160])).toStrictEqual('uhd')
    expect(switchResolution([1920, 1080])).toStrictEqual('fhd')
    expect(switchResolution([1280, 720])).toStrictEqual('hd')
    expect(switchResolution([848, 480])).toStrictEqual('sd')
    expect(switchResolution([640, 360])).toStrictEqual('low')
    expect(switchResolution([428, 240])).toStrictEqual('ulow')
  })
})
