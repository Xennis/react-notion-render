import { type ParagraphBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { type CSSProperties } from "react"

// Just a helper type because it's not directly exposed.
type Color = ParagraphBlockObjectResponse["paragraph"]["color"]

export const notionUrl = "https://www.notion.so"

export const notionColor = (color: Color, backgroundCallout?: boolean): CSSProperties => {
  if (color.endsWith("_background")) {
    return { backgroundColor: `var(--notion-${color}${backgroundCallout ? "_co" : ""}` }
  }
  return { color: `var(--notion-${color})` }
}

// export const noopResolveLinkFn = (nId: string) => nId

export const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ")
}

export const idToUuid = (id: string) =>
  `${id.substring(0, 8)}-${id.substring(8, 12)}-${id.substring(12, 16)}-${id.substring(16, 20)}-${id.substring(20)}`
