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

const idToUuid = (id: string) =>
  `${id.substring(0, 8)}-${id.substring(8, 12)}-${id.substring(12, 16)}-${id.substring(16, 20)}-${id.substring(20)}`

export const notionLinkToUuid = (href: string) => {
  let id = null
  if (href.startsWith("/")) {
    id = href.substring(1) // remove the leading slash
  }
  // e.g. mentions URLs are absolute
  else if (href.startsWith(`${notionUrl}/`)) {
    id = href.replace(`${notionUrl}/`, "")
  }
  // 32 = length of UUID
  if (id === null || id.length !== 32) {
    return null
  }
  return idToUuid(id)
}
