import got from 'got'
import fs from 'fs'
import * as pathModule from 'path'

import stream from 'stream'
import { promisify } from 'util'

export const pipeline = promisify(stream.pipeline);

export async function downloadFile(url: string, path: string, fileName?: string) {
    try {
        if (!fileName) {
            fileName = url.split('/').pop()
        }
        await fs.promises.mkdir(path, { recursive: true })
        let fullPath = pathModule.resolve(path, fileName!)

        await pipeline(
            got.stream(url),
            fs.createWriteStream(fullPath)
        )
    } catch (error) {
        throw error
    }
}