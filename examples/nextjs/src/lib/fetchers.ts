import { unstable_cache } from "next/cache"
import { fetchBlocksChildren, IconResponse } from "@react-notion-cms/render"
import { fetchDatabasePages, propsPlainTexts } from "@react-notion-cms/fetch"
import { Client } from "@notionhq/client"
import { statSync, writeFileSync } from "node:fs"
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"

import nextConfig from "../../next.config.mjs"

const notionClient = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
})

export type Page = {
  slug: string
  blockId: string
  icon: IconResponse
}

export const getCachedPages = unstable_cache(async () => {
  return fetchDatabasePages(notionClient, processPages, {
    database_id: process.env.NOTION_PAGES_DB_ID!,
    page_size: 50,
  })
}, ["cms-pages"])

const processPages = async (page: PageObjectResponse): Promise<Page | null> => {
  const slug = propsPlainTexts(page.properties, "slug")
  const lastEdited = new Date(page.last_edited_time)
  if (!slug || Number.isNaN(lastEdited)) {
    console.warn(`page with id=${page.id} has invalid properties`)
    return null
  }

  const icon = page.icon
  if (icon !== null && icon.type === "file") {
    icon.file.url = await downloadImageToPublicDir(icon.file.url, { blockId: page.id, lastEditedTime: lastEdited })
  }

  return {
    slug: slug,
    blockId: page.id,
    icon: icon,
  }
}

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
