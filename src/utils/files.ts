import got from 'got'
import fs from 'fs'
import * as pathModule from 'path'

import m3u8stream from 'm3u8stream'
import FfmpegCommand from 'fluent-ffmpeg'

import sanitize from 'sanitize-filename'

import stream from 'stream'
import { promisify } from 'util'

import { EpisodeInfo } from '../types'

const pipeline = promisify(stream.pipeline)

export async function downloadFile (url: string, path: string, fileName: string): Promise<void> {
  await fs.promises.mkdir(path, { recursive: true })
  const fullPath = pathModule.resolve(path, fileName)

  await pipeline(
    got.stream(url),
    fs.createWriteStream(fullPath)
  )
}

export function createFileName (info: EpisodeInfo, filePattern: string, lowerCase = false): string {
  let fileName = filePattern
    .replace(new RegExp('<number>', 'g'), info.number.toString())
    .replace(new RegExp('<title>', 'g'), info.title.replace(/-/g, ''))
    .replace(new RegExp('<name>', 'g'), info.name.replace(/-/g, ''))
    .replace(new RegExp('<ext>', 'g'), info.ext)
    .replace(/\s/g, '')
  if (lowerCase) {
    fileName = fileName.toLowerCase()
  }
  return sanitize(fileName)
}

export function downloadManifest (url: string, fullPath: string, ffmpeg: boolean): void{
  if (!ffmpeg) {
    const stream = m3u8stream(url)
    stream.pipe(fs.createWriteStream(fullPath))
  } else {
    const command = FfmpegCommand(url)
      .outputOptions([
        '-c copy',
        '-vcodec copy'
      ])
      .output(fullPath)
      // .on('progress', (progress: any) => {

      // })
      .on('end', (err: Error, stdout: any, stderr: any) => {
        console.log('Finished processing', err, stdout, stderr)
      })

    command.run()
  }
}
