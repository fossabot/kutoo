import fs from 'fs'
import m3u8stream from 'm3u8stream'
import FfmpegCommand from 'fluent-ffmpeg'

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
