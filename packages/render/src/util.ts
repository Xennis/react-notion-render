import {type ParagraphBlockObjectResponse} from "@notionhq/client/build/src/api-endpoints";

// Just a helper type because it's not directly exposed.
type Color = ParagraphBlockObjectResponse["paragraph"]["color"]

export const notionColor = (color: Color) => {
  return `notion-${color.replace("green", "teal")}`
}
