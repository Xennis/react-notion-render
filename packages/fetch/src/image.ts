import { statSync, writeFileSync } from "node:fs"

export const downloadImage = async (dir: string, url: string, meta: { blockId: string; lastEditedTime: Date }) => {
  const fileUrl = new URL(url)
  const originalFileName = fileUrl.pathname.substring(fileUrl.pathname.lastIndexOf("/") + 1)
  const originalFileExtension = originalFileName.split(".").pop()
  // Note: Using path.join from node:path using build errors with Next.js. Using just the forward slash here might be
  // wrong on some system. In general a better approach might be to insert a function which returns the whole filename.
  const newFileName = `${dir}/${meta.blockId}.${originalFileExtension}`

  let savedLastEditedTime: Date | null = null
  try {
    const stat = statSync(newFileName)
    savedLastEditedTime = stat.mtime
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      console.debug(`${newFileName} not found`)
    } else {
      console.warn(`${newFileName}: ${error}`)
    }
  }
  // Avoid download the file again and again
  if (savedLastEditedTime === null || meta.lastEditedTime > savedLastEditedTime) {
    const resp = await fetch(fileUrl)
    const blob = await resp.blob()
    writeFileSync(newFileName, new DataView(await blob.arrayBuffer()))
    console.info(`downloaded image ${newFileName} of block ${meta.blockId}`)
  }

  return newFileName
}
