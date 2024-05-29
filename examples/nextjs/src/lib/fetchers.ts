import { unstable_cache } from "next/cache"
import { fetchBlocksChildren } from "@react-notion-cms/render"
import { Client } from "@notionhq/client"
import { statSync, writeFileSync } from "node:fs"
import nextConfig from "../../next.config.mjs"

const notionClient = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
})

export const getCachedPageContent = unstable_cache(
  async (blockId: string) => {
    return fetchBlocksChildren(
      notionClient,
      {
        block_id: blockId,
        page_size: 100,
      },
      {
        resolveImageFn: downloadImageToPublicDir,
      },
    )
  },
  ["cms-page"],
  // {
  //   revalidate: false,
  //   tags: ["cms-page"],
  // },
)

const downloadImageToPublicDir = async (url: string, meta: { blockId: string; lastEditedTime: Date }) => {
  const fileUrl = new URL(url)
  const originalFileName = fileUrl.pathname.substring(fileUrl.pathname.lastIndexOf("/") + 1)
  const newFileName = `public/cms/${meta.blockId}-${originalFileName}`

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

  return newFileName.replace("public", nextConfig.basePath ?? "")
}
