import { type ParagraphBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { type CSSProperties } from "react"

// Just a helper type because it's not directly exposed.
type Color = ParagraphBlockObjectResponse["paragraph"]["color"]

export const notionColor = (color: Color, backgroundCallout?: boolean): CSSProperties => {
  if (color.endsWith("_background")) {
    return { backgroundColor: `var(--notion-${color}${backgroundCallout ? "_co" : ""}` }
  }
  return { color: `var(--notion-${color})` }
}

export const relativeNotionUrl = (url: string) => {
  return url.replace("https://www.notion.so", "")
}

// export const noopResolveLinkFn = (nId: string) => nId

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ")
}
