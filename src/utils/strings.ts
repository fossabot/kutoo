import { URL } from 'url'
import { resolution, numberResolution } from '@kutoo/types'

export function getStringBewtween (str: string, start: string, end: string, shift?: number): string {
  shift = shift ?? 0
  const data = str.slice(str.indexOf(start) + start.length, str.length)
  return data.substring(0, data.indexOf(end) + shift)
}

export function isUrl (url: string): boolean {
  try {
    const parsed = new URL(url)
    return typeof parsed !== 'undefined'
  } catch (error) {
    return false
  }
};

export function nthIndex (str: string, pat: string, n: number): number {
  const L = str.length; let i = -1
  // eslint-disable-next-line
  while (n-- && i++ < L) {
    i = str.indexOf(pat, i)
  }
  return i
}

export function getDomain (url: string): string {
  if (!isUrl(url)) {
    throw new Error('Invalid url')
  }
  const parsed = new URL(url)
  return parsed.host
}

export function switchResolution (res: resolution): numberResolution
export function switchResolution (res: numberResolution): resolution
export function switchResolution (res: any): any {
  if (typeof res === 'string') {
    switch (res) {
      case 'uhd':
        return [3840, 2160]
      case 'fhd':
        return [1920, 1080]
      case 'hd':
        return [1280, 720]
      case 'sd':
        return [848, 480]
      case 'low':
        return [640, 360]
      case 'ulow':
        return [428, 240]
    }
  } else {
    switch (res.toString()) {
      case [3840, 2160].toString():
        return 'uhd'
      case [1920, 1080].toString():
        return 'fhd'
      case [1280, 720].toString():
        return 'hd'
      case [848, 480].toString():
        return 'sd'
      case [640, 360].toString():
        return 'low'
      case [428, 240].toString():
        return 'ulow'
    }
  }
}

export function naturalSort (a: string, b: string): number {
  return a.localeCompare(b, undefined, {
    numeric: true
  })
}
