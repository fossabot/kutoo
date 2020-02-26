import fs from 'fs'
import m3u8stream from 'm3u8stream'

export function downloadManifest (url: string, fullPath: string, ffmpeg: boolean): void{
  // console.log(url, path)
  if (!ffmpeg) {
    const stream = m3u8stream(url)
    stream.pipe(fs.createWriteStream(fullPath))
    stream.on('progress', (segment, totalSegments, downloaded) => {
    //   readline.cursorTo(process.stdout, 0)
    //   process.stdout.write(
    //             `${segment.num} of ${totalSegments} segments ` +
    //             `(${(segment.num / totalSegments * 100).toFixed(2)}%) ` +
    //             `${(downloaded / 1024 / 1024).toFixed(2)}MB downloaded`)
    })
  }
}
