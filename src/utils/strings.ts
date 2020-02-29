import { URL } from 'url'

export function getStringBewtween (str: string, start: string, end: string, shift?: number): string {
  shift = shift ?? 0
  const data = str.slice(str.indexOf(start) + start.length, str.length)
  return data.substring(0, data.indexOf(end) + shift)
}

export function isUrl (url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed !== undefined
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
