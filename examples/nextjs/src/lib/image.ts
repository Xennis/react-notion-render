import path from "node:path"
import { statSync, writeFileSync } from "node:fs"

import nextConfig from "../../next.config.mjs"

const downloadImage = async (dir: string, url: string, meta: { blockId: string; lastEditedTime: Date }) => {
  const fileUrl = new URL(url)
  const originalFileName = fileUrl.pathname.substring(fileUrl.pathname.lastIndexOf("/") + 1)
  const originalFileExtension = originalFileName.split(".").pop()
  const newFileName = path.join(dir, `${meta.blockId}.${originalFileExtension}`)

  let savedLastEditedTime: Date | null = null
  try {
    const stat = statSync(newFileName)
    savedLastEditedTime = stat.mtime
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      console.debug(`${newFileName} not found`)
    } else {
      console.warn(`failed to download ${newFileName}`, error)
    }
  }
  // Avoid download the file again and again
  if (savedLastEditedTime === null || meta.lastEditedTime > savedLastEditedTime) {
    const resp = await fetch(fileUrl)
    const blob = await resp.blob()
    writeFileSync(newFileName, new DataView(await blob.arrayBuffer()))
    console.debug(`downloaded image ${newFileName} of block ${meta.blockId}`)
  }

  return newFileName
}

export const downloadImageToPublicDir = async (url: string, meta: { blockId: string; lastEditedTime: Date }) => {
  const localImage = await downloadImage("public/cms", url, meta)
  return localImage.replace("public", nextConfig.basePath ?? "")
}
