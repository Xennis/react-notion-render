import { unstable_cache } from "next/cache"
import { fetchBlocksChildren } from "@react-notion-cms/render"
import { Client } from "@notionhq/client"

const notionClient = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
})

export const getCachedPageContent = unstable_cache(
  async (blockId: string) => {
    return fetchBlocksChildren(notionClient, blockId)
  },
  ["cms-page"],
  // {
  //   revalidate: false,
  //   tags: ["cms-page"],
  // },
)
