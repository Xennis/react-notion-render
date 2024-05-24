import type { CSSProperties } from "react"
import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"

import { notionColor } from "../util"

export const RichTexts = ({
  value,
}: {
  value: Array<RichTextItemResponse>
}) => {
  return (
    <>
      {value.map((t, index) => (
        <RichText key={index} value={t} />
      ))}
    </>
  )
}

const RichText = ({
  value,
}: {
  value: RichTextItemResponse
}) => {
  switch (value.type) {
    case "text":
      const textStyle: CSSProperties = {
        // Otherwise line breaks are not shown
        whiteSpace: "pre-wrap",
      }
      let text = <span style={textStyle}>{value.text.content}</span>
      if (value.annotations.color) {
        text = <span className={notionColor(value.annotations.color)}>{text}</span>
      }
      if (value.annotations.bold) {
        text = <b>{text}</b>
      }
      if (value.annotations.italic) {
        text = <i>{text}</i>
      }
      if (value.annotations.strikethrough) {
        text = <s>{text}</s>
      }
      if (value.annotations.underline) {
        text = <span className="notion-inline-underscore">{text}</span>
      }
      if (value.annotations.code) {
        text = <code className="notion-inline-code">{text}</code>
      }

      return text
  }
}
