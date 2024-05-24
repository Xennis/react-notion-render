import type { JSX } from "react"

import { RichTexts } from "./text"
import { notionColor } from "./util"
import type { BlockObjectResponseWithChildren } from "./types"

export const Render = ({
  blocks,
}: {
  blocks: Array<BlockObjectResponseWithChildren>
}) => {
  return (
    <>
      <div className="notion">
        <RenderBlocks blocks={blocks} />
      </div>
    </>
  )
}

const RenderBlocks = ({
  blocks,
}: {
  blocks: Array<BlockObjectResponseWithChildren>
}) => {
  let elements: Array<JSX.Element> = []
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i]
    switch (block.type) {
      default:
        elements.push(<Block key={i} block={block} />)
        break
    }
  }
  return <>{elements}</>
}

const Block = ({
  block,
}: {
  block: BlockObjectResponseWithChildren
}) => {
  switch (block.type) {
    case "paragraph":
      return (
        <p className={notionColor(block.paragraph.color)}>
          <RichTexts value={block.paragraph.rich_text} />
        </p>
      )
  }
  return <></>
}
