import { Fragment, type JSX } from "react"

import { RichTexts } from "./components/text"
import { classNames, notionColor } from "./util"
import type { BlockObjectResponseWithChildren, RichTextOptions } from "./types"
import { Heading } from "./components/heading"
import { Icon } from "./components/icon"
import { Checkbox } from "./components/checkbox"

export const Render = ({
  blocks,
  options,
}: {
  blocks: Array<BlockObjectResponseWithChildren>
  options: RichTextOptions
}) => {
  return (
    <div className="notion">
      <RenderBlocks blocks={blocks} options={options} />
    </div>
  )
}

const RenderBlocks = ({
  blocks,
  options,
}: {
  blocks: Array<BlockObjectResponseWithChildren>
  options: RichTextOptions
}) => {
  const nextBlocksOfSameType = (startIndex: number, type: string) => {
    const result: Array<BlockObjectResponseWithChildren> = []
    for (let i = startIndex; i < blocks.length; i++) {
      const nextBlock = blocks[i]
      if (nextBlock.type === type) {
        result.push(nextBlock)
      } else {
        break
      }
    }
    return result
  }

  let elements: Array<JSX.Element> = []
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i]
    switch (block.type) {
      case "bulleted_list_item":
        const bulletedListItems = [block, ...nextBlocksOfSameType(i + 1, block.type)]
        i = i + bulletedListItems.length - 1
        elements.push(
          <ul key={i} className="notion-list notion-list-disc">
            {bulletedListItems.map((item) => (
              <Block key={item.id} block={item} options={options} />
            ))}
          </ul>,
        )
        break
      case "numbered_list_item":
        const numberedListItems = [block, ...nextBlocksOfSameType(i + 1, block.type)]
        i = i + numberedListItems.length - 1
        elements.push(
          <ol key={i} className="notion-list notion-list-numbered">
            {numberedListItems.map((item) => (
              <Block key={item.id} block={item} options={options} />
            ))}
          </ol>,
        )
        break
      default:
        elements.push(<Block key={i} block={block} options={options} />)
        break
    }
  }
  return <>{elements}</>
}

const Block = ({ block, options }: { block: BlockObjectResponseWithChildren; options: RichTextOptions }) => {
  switch (block.type) {
    case "audio":
      break
    case "breadcrumb":
      break
    case "bookmark":
      let title
      try {
        const url = new URL(block.bookmark.url)
        title = url.hostname
      } catch (err) {
        // ignore invalid links
      }
      return (
        <div className="notion-row">
          <a href={block.bookmark.url} target="_blank" rel="noopener noreferrer" className="notion-bookmark rounded-lg">
            <div>
              {title && <div className="notion-bookmark-title">{title}</div>}
              <div className="notion-bookmark-link">
                <div className="notion-bookmark-link-text">{block.bookmark.url}</div>
              </div>
            </div>
          </a>
        </div>
      )
    case "bulleted_list_item":
      return (
        <li className={notionColor(block.bulleted_list_item.color)}>
          <RichTexts value={block.bulleted_list_item.rich_text} options={options} />
          {block._children && <RenderBlocks blocks={block._children} options={options} />}
        </li>
      )
    case "callout":
      return (
        <div className={classNames("notion-callout", `${notionColor(block.callout.color)}_co`)}>
          <Icon icon={block.callout.icon} width={28} />
          <div className="notion-callout-text">
            <RichTexts value={block.callout.rich_text} options={options} />
          </div>
        </div>
      )
    case "child_database":
      break
    case "child_page":
      break
    case "code":
      // TODO: <Code {...block.code} />
      break
    case "column":
      // It's the child of column_list and handled there
      break
    case "column_list":
      const columnListChildren = block._children
      if (!columnListChildren) {
        return <></>
      }

      const spacerWidth = `min(32px, 4vw)`
      const ratio = 0.5
      const columns = columnListChildren.length
      const width = `calc((100% - (${columns - 1} * ${spacerWidth})) * ${ratio})`
      return (
        <div className="notion-row">
          {columnListChildren.map((column, index) => {
            // The Fragment is only used to not destory the CSS.
            return (
              <Fragment key={index}>
                <div className="notion-column" style={{ width }}>
                  <RenderBlocks blocks={column._children ?? []} options={options} />
                </div>
                <div className="notion-spacer" />
              </Fragment>
            )
          })}
        </div>
      )
    case "divider":
      return <hr className="notion-hr" />
    case "embed":
    case "equation":
    case "file":
      break
    case "heading_1":
      return (
        <Heading
          as="h1"
          rich_text={block.heading_1.rich_text}
          color={block.heading_1.color}
          is_toggleable={block.heading_1.is_toggleable}
          options={options}
        >
          {block._children && (
            <div>
              <RenderBlocks blocks={block._children} options={options} />
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
          options={options}
        >
          {block._children && (
            <div>
              <RenderBlocks blocks={block._children} options={options} />
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
          options={options}
        >
          {block._children && (
            <div>
              <RenderBlocks blocks={block._children} options={options} />
            </div>
          )}
        </Heading>
      )
    case "image":
      const imageUrl = block.image.type === "external" ? block.image.external.url : block.image.file.url
      if (!imageUrl) {
        console.warn(`image for ${block.id} missing`)
        break
      }
      const imageHasCaption = block.image.caption.length > 0
      return (
        <figure className="notion-asset-wrapper">
          {/* If you delete this div the images are centered. If you wanna delete it adjust the CSS. */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={imageHasCaption ? block.image.caption[0].plain_text : "image"}
              style={{
                alignSelf: "center",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "center",
                maxHeight: "100%",
                maxWidth: "100%",
                position: "relative",
                borderRadius: "0.25rem",
              }}
            />
          </div>
          {imageHasCaption ? (
            <figcaption className="notion-asset-caption">
              <RichTexts value={block.image.caption} options={options} />
            </figcaption>
          ) : (
            <></>
          )}
        </figure>
      )
    case "link_preview":
      break
    case "link_to_page":
      break
    case "numbered_list_item":
      return (
        <li className={notionColor(block.numbered_list_item.color)}>
          <RichTexts value={block.numbered_list_item.rich_text} options={options} />
          {block._children && <RenderBlocks blocks={block._children} options={options} />}
        </li>
      )
    case "paragraph":
      return (
        <p className={notionColor(block.paragraph.color)}>
          <RichTexts value={block.paragraph.rich_text} options={options} />
        </p>
      )
    case "pdf":
      break
    case "quote":
      return (
        <blockquote className={classNames("notion-quote", notionColor(block.quote.color))}>
          <div>
            <RichTexts value={block.quote.rich_text} options={options} />
          </div>
          <RenderBlocks blocks={block._children ?? []} options={options} />
        </blockquote>
      )
    case "synced_block":
      return <RenderBlocks blocks={block._children ?? []} options={options} />
    case "table_of_contents":
      break
    case "table":
      const tableChildren = block._children
      if (!tableChildren) {
        return <></>
      }

      const tableHeadRow = block.table.has_column_header ? tableChildren[0] : undefined
      const tableBodyRows = block.table.has_column_header ? tableChildren.slice(1) : tableChildren

      return (
        <table className={classNames("notion-simple-table", block.table.has_row_header ? "xnotion-row-header" : "")}>
          {tableHeadRow && (
            <thead>
              <Block block={tableHeadRow} options={options} />
            </thead>
          )}
          <tbody>
            <RenderBlocks blocks={tableBodyRows} options={options} />
          </tbody>
        </table>
      )
    case "table_row":
      const rowCells = block.table_row.cells
      if (!rowCells) {
        return <></>
      }
      return (
        <tr className="notion-simple-table-row">
          {rowCells.map((cell, index) => {
            return (
              <td key={index}>
                <div className="notion-simple-table-cell">
                  <RichTexts value={cell} options={options} />
                </div>
              </td>
            )
          })}
        </tr>
      )
    case "template":
      break
    case "to_do":
      const isChecked = block.to_do.checked
      return (
        <div className="notion-to-do">
          <div className="notion-to-do-item">
            <Checkbox checked={isChecked} />
            <div className={classNames("notion-to-do-body", isChecked ? `notion-to-do-checked` : "")}>
              <RichTexts value={block.to_do.rich_text} options={options} />
            </div>
          </div>
        </div>
      )
    case "toggle":
      return (
        <details className={`notion-toggle ${notionColor(block.toggle.color)}`}>
          {/* Without the bottom padding for example a normal paragraph is too close. It looks strange. */}
          <summary className="pb-2">
            <RichTexts value={block.toggle.rich_text} options={options} />
          </summary>

          <div>
            <RenderBlocks blocks={block._children ?? []} options={options} />
          </div>
        </details>
      )
    case "unsupported":
      break
    case "video":
      // TODO
      break
  }
  return <></>
}
