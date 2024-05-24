import { type Client, isFullBlock, iteratePaginatedAPI } from "@notionhq/client"
import { BlockObjectResponseWithChildren } from "./types"

export const fetchBlocksChildren = async (client: Client, blockId: string) => {
  const result: Array<BlockObjectResponseWithChildren> = []
  for await (const block of iteratePaginatedAPI(client.blocks.children.list, {
    block_id: blockId,
    page_size: 100,
  })) {
    if (isFullBlock(block)) {
      if (!block.has_children) {
        result.push(block)
        continue
      }
      const childId =
        block.type === "synced_block" && block.synced_block.synced_from !== null
          ? block.synced_block.synced_from.block_id
          : block.id

      result.push({
        ...block,
        _children: await fetchBlocksChildren(client, childId),
      })
    }
  }
  console.info(`fetched children from notion block ${blockId}`)
  return result
}
