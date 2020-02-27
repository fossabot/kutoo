import got from 'got'
import fs from 'fs'
import * as pathModule from 'path'

import sanitize from 'sanitize-filename'

import stream from 'stream'
import { promisify } from 'util'

import { EpisodeInfo } from '../types'

export const pipeline = promisify(stream.pipeline)

export async function downloadFile (url: string, path: string, fileName: string): Promise<void> {
  await fs.promises.mkdir(path, { recursive: true })
  const fullPath = pathModule.resolve(path, fileName)

  await pipeline(
    got.stream(url),
    fs.createWriteStream(fullPath)
  )
}

export function createFileName (info: EpisodeInfo, filePattern: string): string {
  const fileName = filePattern
    .replace(new RegExp('<number>', 'g'), info.number.toString())
    .replace(new RegExp('<title>', 'g'), info.title.replace(/-/g, ''))
    .replace(new RegExp('<name>', 'g'), info.name.replace(/-/g, ''))
    .replace(new RegExp('<ext>', 'g'), info.ext)
    .replace(/\s/g, '')
  return sanitize(fileName)
}