import { type Heading1BlockObjectResponse, type RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"
import { Fragment } from "react"

import { cn, notionColor } from "../util"
import { RichTexts } from "./text"
import { RenderOptions } from "../types"
import { Toggle } from "./toggle"

export const Heading = ({
  as,
  rich_text,
  color,
  is_toggleable,
  options,
  children,
}: {
  as: "h1" | "h2" | "h3"
  rich_text: Array<RichTextItemResponse>
  color: Heading1BlockObjectResponse["heading_1"]["color"]
  is_toggleable: boolean
  options: RenderOptions
  children: React.ReactNode
}) => {
  const id = idFromRichTexts(rich_text)
  // ref: .notion-h .notion-h1, .notion-h2, .notion-h3
  const props = {
    id: id,
    style: {
      display: is_toggleable ? "inline" : "block",
      marginTop: as === "h1" ? "1.08em" : as === "h2" ? "1.1em" : "1em",
      ...notionColor(color),
    },
    className: cn(
      "relative inline-block font-semibold leading-[1.3] max-w-full whitespace-pre-wrap mb-px px-0.5 py-[3px] break-words group",
      as === "h1" ? "text-[1.875em]" : as === "h2" ? "text-[1.5em]" : "text-[1.25em]",
    ),
  }

  const innerElement = (
    <Fragment>
      {/*{!is_toggleable && (*/}
      {/*  // ref: .notion-hash-link*/}
      {/*  // note(adjusted): original `margin-left: -20px; padding-right: 4px;`*/}
      {/*  <a*/}
      {/*    className="float-start ms-[-25px] fill-(--fg-color-icon) pe-0 no-underline opacity-0 group-hover:opacity-100"*/}
      {/*    href={`#${id}`}*/}
      {/*  >*/}
      {/*    <LinkIcon width={18} height={18} />*/}
      {/*  </a>*/}
      {/*)}*/}
      {/* ref: .notion-h-title */}
      <span>
        <RichTexts value={rich_text} options={options} />
      </span>
    </Fragment>
  )

  // h1 is the title of the page. So we reduce it by one level.
  const headingElement =
    as === "h1" ? (
      <h2 {...props}>{innerElement}</h2>
    ) : as === "h2" ? (
      <h3 {...props}>{innerElement}</h3>
    ) : (
      <h4 {...props}>{innerElement}</h4>
    )
  if (!is_toggleable) {
    return headingElement
  }

  // This is a little bit hacky. render-notion-x sets the display to `inline-block`. But this leads to an ugly breaking
  // of the marker and the text on small screens.
  //
  // Hence we have sat the display to `inline` but then the margin of `notion-<as>` is not applied. So we add it:
  const summaryStyle = {
    marginTop: as === "h1" ? "1.08em" : as === "h2" ? "1.1em" : "1.25em",
  }

  return (
    <Toggle summary={headingElement} summaryStyle={summaryStyle}>
      {children}
    </Toggle>
  )
}

const idFromRichTexts = (richTexts: Array<RichTextItemResponse>) => {
  if (richTexts.length === 0) {
    return undefined
  }
  const slug = encodeURIComponent(richTexts[0].plain_text.toLowerCase().trim().replace(/\s+/g, "-"))
  if (!slug) {
    return undefined
  }
  return slug
}
