import { type ParagraphBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"

// Just a helper type because it's not directly exposed.
type Color = ParagraphBlockObjectResponse["paragraph"]["color"]

export const notionColor = (color: Color) => {
  return `notion-${color.replace("green", "teal")}`
}

export const relativeNotionUrl = (url: string) => {
  return url.replace("https://www.notion.so", "")
}

// export const noopResolveLinkFn = (nId: string) => nId

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ")
}
