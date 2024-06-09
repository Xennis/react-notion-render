import { type Client, isFullBlock, iteratePaginatedAPI } from "@notionhq/client"
import { BlockObjectResponseWithChildren } from "./types"
import { type ListBlockChildrenParameters } from "@notionhq/client/build/src/api-endpoints"

type ResolveImageFn = (url: string, meta: { blockId: string; lastEditedTime: Date }) => Promise<string>

export const fetchBlocksChildren = async (
  client: Client,
  firstPageArgs: ListBlockChildrenParameters,
  options?: { resolveImageFn?: ResolveImageFn },
) => {
  const result: Array<BlockObjectResponseWithChildren> = []
  for await (const block of iteratePaginatedAPI(client.blocks.children.list, firstPageArgs)) {
    if (isFullBlock(block)) {
      if (options?.resolveImageFn && block.type === "image" && block.image.type === "file") {
        block.image.file.url = await options.resolveImageFn(block.image.file.url, {
          blockId: block.id,
          lastEditedTime: new Date(block.last_edited_time),
        })
      }

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
        _children: await fetchBlocksChildren(
          client,
          {
            ...firstPageArgs,
            block_id: childId,
          },
          options,
        ),
      })
    }
  }
  console.info(`fetched children from notion block ${firstPageArgs.block_id}`)
  return result
}
