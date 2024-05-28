import { type JSX } from "react"

import { RichTexts } from "./components/text"
import { classNames, notionColor } from "./util"
import type { BlockObjectResponseWithChildren, RichTextOptions } from "./types"
import { Heading } from "./components/heading"
import { Icon } from "./components/icon"
import { Checkbox } from "./components/checkbox"
import { Link, PageTitle } from "./components/link"
import { Toggle } from "./components/toggle"

export const Render = ({
  blocks,
  options,
}: {
  blocks: Array<BlockObjectResponseWithChildren>
  options: RichTextOptions
}) => {
  return (
    <div className="text-base leading-normal text-[color:var(--fg-color)] caret-[color:var(--fg-color)]">
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
          // ref: .notion-list, .notion-list-disc
          // note: style probably should be not be applied to neasted list
          <ul
            key={i}
            className="m-0 list-disc ps-[1.7em]"
            style={{ marginBlockStart: "0.6em", marginBlockEnd: "0.6em" }}
          >
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
          // ref: .notion-list, .notion-list-numbered
          // note: style probably should be not be applied to neasted list
          <ol
            key={i}
            className="m-0 list-decimal ps-[1.6em]"
            style={{ marginBlockStart: "0.6em", marginBlockEnd: "0.6em" }}
          >
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
      // note(not implemented): .notion-bookmark-image
      return (
        <div className="notion-row">
          {/* ref: .notion-bookmark */}
          <a
            href={block.bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: "1px", marginBottom: "1px" }}
            className="box-border flex w-full select-none overflow-hidden rounded-[3px] border border-solid border-[--fg-color-1] no-underline dark:border-[--bg-color-0]"
          >
            <div className="flex-[4_1_180px] overflow-hidden px-3.5 pb-3.5 pt-3 text-left text-[--fg-color]">
              {/* ref: .notion-bookmark-title */}
              {title && (
                <div className="mb-0.5 min-h-[24px] overflow-hidden text-ellipsis whitespace-nowrap text-sm leading-5">
                  {title}
                </div>
              )}
              {/* ref: ..notion-bookmark-link */}
              <div className="mt-1.5 flex">
                {/* ref: .notion-bookmark-link-text */}
                <div className="overflow-hidden text-ellipsis whitespace-nowrap text-xs leading-4 text-[--fg-color]">
                  {block.bookmark.url}
                </div>
              </div>
            </div>
          </a>
        </div>
      )
    case "bulleted_list_item":
      return (
        <li
          style={notionColor(block.bulleted_list_item.color)}
          className={"py-1.4 whitespace-pre-wrap pe-0 ps-[0.1em]"}
        >
          <RichTexts value={block.bulleted_list_item.rich_text} options={options} />
          {block._children && <RenderBlocks blocks={block._children} options={options} />}
        </li>
      )
    case "callout":
      return (
        // ref: .notion-callout
        <div
          style={{ marginTop: "6px", marginBottom: "6px", ...notionColor(block.callout.color, true) }}
          className={
            "box-border inline-flex w-full items-center rounded-[3px] border border-[--fg-color-0] py-4 pe-4 ps-3 dark:border-[--bg-color-2]"
          }
        >
          <Icon icon={block.callout.icon} width={28} />
          {/* ref: .notion-callout-text */}
          <div className="ms-4 whitespace-pre-wrap break-words">
            <RichTexts value={block.callout.rich_text} options={options} />
          </div>
        </div>
      )
    case "child_database":
      break
    case "child_page":
      const childPageResolved = options.resolveLinkFn(block.id)
      if (!childPageResolved) {
        return <></>
      }
      return (
        <p>
          <Link {...childPageResolved}>
            <PageTitle icon={childPageResolved.icon}>{block.child_page.title}</PageTitle>
          </Link>
        </p>
      )
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
      return (
        // ref: .notion-row
        <div className="flex space-x-4">
          {columnListChildren.map((column, index) => {
            return (
              // ref: .notion-column
              <div className="flex flex-1 flex-col" key={index}>
                <RenderBlocks blocks={column._children ?? []} options={options} />
              </div>
            )
          })}
        </div>
      )
    case "divider":
      // ref: .notion-hr
      return <hr className="h-px bg-[--fg-color-0]" style={{ marginTop: "8px", marginBottom: "8px" }} />
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
      // note(not implemented): .notion-image
      return (
        // ref: .notion-asset-wrapper
        // note: original breakpoint for max-w: `only screen and (max-width: 730px)`
        <figure className="mx-0 my-2 flex min-w-full max-w-full flex-col self-center sm:max-w-[100vw]">
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
            // ref: .notion-asset-caption
            <figcaption className="whitespace-pre-wrap break-words py-1.5 pl-0.5 pr-0 text-sm leading-[1.4] text-[color:var(--fg-color-3)] caret-[color:var(--fg-color)]">
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
        <li style={notionColor(block.numbered_list_item.color)} className="py-1.4 whitespace-pre-wrap pe-0 ps-[0.2em]">
          <RichTexts value={block.numbered_list_item.rich_text} options={options} />
          {block._children && <RenderBlocks blocks={block._children} options={options} />}
        </li>
      )
    case "paragraph":
      return (
        <p style={notionColor(block.paragraph.color)} className="py-[3px]">
          <RichTexts value={block.paragraph.rich_text} options={options} />
        </p>
      )
    case "pdf":
      break
    case "quote":
      return (
        // ref: .notion-quote
        <blockquote
          style={notionColor(block.quote.color)}
          className={
            "mx-0 my-1.5 block w-full whitespace-pre-wrap break-words border-l-[3px] border-solid border-l-[currentcolor] px-[0.9em] py-[0.2em] text-[1.2em]"
          }
        >
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
        // ref: .notion-simple-table
        // note: if block.table.has_row_header then CSS is needed:
        // table.xnotion-row-header tr td:first-child {
        //   background: var(--bg-color-0);
        // }
        <table className="border-collapse border-spacing-0 border border-solid border-[--fg-color-5] text-sm">
          {tableHeadRow && (
            <thead className="bg-[--bg-color-0]">
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
        // ref: .notion-simple-table-row
        <tr>
          {rowCells.map((cell, index) => {
            return (
              <td key={index} className="whitespace-pre-wrap border border-solid border-[--fg-color-5] p-2">
                {/* ref: .notion-simple-table-cell */}
                <div>
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
        // note(not implemented): .notion-to-do-children
        // ref: .notion-to-do
        <div className="flex w-full flex-col">
          {/* ref: .notion-to-do-item */}
          <div className="flex min-h-[calc(1.5em_+_3px_+_3px)] w-full items-center ps-0.5">
            <Checkbox checked={isChecked} />
            {/* ref: .notion-to-do-body, if isChecked: notion-to-do-checked */}
            <div
              className={classNames("whitespace-pre-wrap break-words", isChecked ? `line-through opacity-[0.375]` : "")}
            >
              <RichTexts value={block.to_do.rich_text} options={options} />
            </div>
          </div>
        </div>
      )
    case "toggle":
      return (
        <Toggle
          detailsStyle={notionColor(block.toggle.color)}
          summary={<RichTexts value={block.toggle.rich_text} options={options} />}
        >
          <RenderBlocks blocks={block._children ?? []} options={options} />
        </Toggle>
      )
    case "unsupported":
      break
    case "video":
      // TODO
      break
  }
  return <></>
}
