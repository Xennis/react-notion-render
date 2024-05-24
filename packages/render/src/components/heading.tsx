import {
  type Heading1BlockObjectResponse,
  type RichTextItemResponse
} from "@notionhq/client/build/src/api-endpoints"
import { LinkIcon } from "../thirdparty/heroicons/link-icon"
import { Fragment, type ReactNode } from "react"

import { notionColor } from "../util"
import { RichTexts } from "./text"

export const Heading = ({
  as,
  rich_text,
  color,
  is_toggleable,
  children,
}: {
  as: "h1" | "h2" | "h3"
  rich_text: Array<RichTextItemResponse>
  color: Heading1BlockObjectResponse["heading_1"]["color"]
  is_toggleable: boolean
  children: ReactNode
}) => {
  const id = idFromRichTexts(rich_text)
  const props = {
    id: id,
    style: { display: is_toggleable ? "inline" : "block" },
    className: `notion-h notion-${as} ${notionColor(color)})`,
  }

  const innerElement = (
    <Fragment>
      {!is_toggleable && (
        <a className="notion-hash-link" href={`#${id}`}>
          <LinkIcon width={20} height={20} />
        </a>
      )}
      <span className="notion-h-title">
        <RichTexts value={rich_text} />
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
    <details className="notion-toggle">
      <summary style={summaryStyle}>{headingElement}</summary>
      {children}
    </details>
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
