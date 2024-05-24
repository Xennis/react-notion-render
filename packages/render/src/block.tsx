import type { JSX } from "react"

import { RichTexts } from "./components/text"
import { notionColor } from "./util"
import type { BlockObjectResponseWithChildren } from "./types"
import {Heading} from "./components/heading";

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
    case "heading_1":
      return (
          <Heading
              as="h1"
              rich_text={block.heading_1.rich_text}
              color={block.heading_1.color}
              is_toggleable={block.heading_1.is_toggleable}
          >
            {block._children && (
                <div>
                  <RenderBlocks blocks={block._children} />
                </div>
            )}
          </Heading>
      )
    case "heading_2":
      return (
          <Heading
              as="h2"
              rich_text={block.heading_2.rich_text}
              color={block.heading_2.color}
              is_toggleable={block.heading_2.is_toggleable}
          >
            {block._children && (
                <div>
                  <RenderBlocks blocks={block._children} />
                </div>
            )}
          </Heading>
      )
    case "heading_3":
      return (
          <Heading
              as="h3"
              rich_text={block.heading_3.rich_text}
              color={block.heading_3.color}
              is_toggleable={block.heading_3.is_toggleable}
          >
            {block._children && (
                <div>
                  <RenderBlocks blocks={block._children} />
                </div>
            )}
          </Heading>
      )
    case "paragraph":
      return (
        <p className={notionColor(block.paragraph.color)}>
          <RichTexts value={block.paragraph.rich_text} />
        </p>
      )
  }
  return <></>
}
