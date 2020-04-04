import PdfDocument from 'pdfkit'
import fs from 'fs'
import { imageSize } from 'image-size'
import * as pathModule from 'path'

import { naturalSort } from '@kutoo/utils'

function addChapter (doc: PDFKit.PDFDocument, pages: string[], title?: string): void {
  for (const page of pages) {
    console.log(page)

    try {
      const width = imageSize(page).width ?? 0
      const height = imageSize(page).height ?? 0
      doc.addPage({ size: [width, height] }).image(page, 0, 0)
    } catch (error) {
      doc.addPage().text('The image was missing or most probably corrupted')
    }
    if (pages.indexOf(page) === 0 && typeof title !== 'undefined') {
      // @ts-ignore
      doc.outline.addItem(title)
    }
  }
}

export async function createPdf (path: string, outpath: string, name: string): Promise<void> {
  const doc = new PdfDocument({ autoFirstPage: false })

  let pages: string[] = []

  const dirs = await fs.promises.readdir(path)
  dirs.forEach(file => {
    pages.push(pathModule.resolve(path, file))
  })

  pages = pages.sort(naturalSort)

  for (const page of pages) {
    const stat = await fs.promises.lstat(page)
    if (!stat.isFile()) {
      let truePages: string[] = []

      const dirs = await fs.promises.readdir(pathModule.resolve(page))

      dirs.forEach(file => {
        truePages.push(pathModule.resolve(path, page, file))
      })

      truePages = truePages.sort(naturalSort)
      addChapter(doc, truePages, page.split('\\').pop())
    } else {
      addChapter(doc, pages)
      break
    }
  }

  doc.pipe(fs.createWriteStream(pathModule.resolve(outpath, `${name}.pdf`)))
  doc.end()
}
