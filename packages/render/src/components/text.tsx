import type { CSSProperties } from "react"
import type { MentionRichTextItemResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"

import { notionColor, relativeNotionUrl } from "../util"
import { RichTextOptions } from "../types"

export const RichTexts = ({ value, options }: { value: Array<RichTextItemResponse>; options: RichTextOptions }) => {
  return (
    <>
      {value.map((t, index) => (
        <RichText key={index} value={t} options={options} />
      ))}
    </>
  )
}

const RichText = ({ value, options }: { value: RichTextItemResponse; options: RichTextOptions }) => {
  switch (value.type) {
    case "equation":
      // Not supported
      return <></>
    case "mention":
      const mentionContent = mentionText(value, options.formatDateFn)
      if (!mentionContent) {
        // Not supported
        return <></>
      }
      let result = <>{mentionContent}</>
      // FIXME(post-mvp): Merge annotations with "text":
      if (value.annotations.color) {
        result = <span className={notionColor(value.annotations.color)}>{result}</span>
      }
      if (value.annotations.bold) {
        result = <b>{result}</b>
      }
      if (value.annotations.italic) {
        result = <i>{result}</i>
      }
      if (value.annotations.strikethrough) {
        result = <s>{result}</s>
      }
      if (value.annotations.underline) {
        result = <span className="notion-inline-underscore">{result}</span>
      }
      if (value.annotations.code) {
        result = <code className="notion-inline-code">{result}</code>
      }

      // Normal links are relative, e.g. /<uuid>, but mentions are absolute, e.g. https://www.notion.so/<uuid>
      let mentionUrl = value.href !== null ? relativeNotionUrl(value.href) : null
      if (mentionUrl) {
        const isRelative = mentionUrl.startsWith("/")
        if (isRelative) {
          mentionUrl = options.resolveLinkFn(mentionUrl.substring(1)) // remove the leading slash
        }
        result = (
          <a
            className="notion-link"
            href={mentionUrl !== null ? mentionUrl : "#"}
            target={isRelative ? undefined : "_blank"}
          >
            {result}
          </a>
        )
      }
      return result
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

      let textUrl = value.text.link?.url ?? null
      if (textUrl) {
        const isRelative = textUrl.startsWith("/")
        if (isRelative) {
          textUrl = options.resolveLinkFn(textUrl.substring(1)) // remove the leading slash
        }
        text = (
          <a
            className="notion-link"
            href={textUrl !== null ? textUrl : "#"}
            target={isRelative ? undefined : "_blank"}
          >
            {text}
          </a>
        )
      }
      return text
  }
}

const mentionText = (value: MentionRichTextItemResponse, formatDateFn: (date: Date) => string) => {
  switch (value.mention.type) {
    case "database":
      return null
    case "date":
      try {
        let dateText = formatDateFn(new Date(value.mention.date.start))
        if (value.mention.date.end) {
          dateText += ` → ${formatDateFn(new Date(value.mention.date.end))}`
        }
        // Ignored
        // value.mention.date.time_zone
        return dateText
      } catch (e) {
        console.warn(`Failed to parse date '${value.mention.date}': ${e}`)
        return null
      }
    case "link_preview":
      return null
    case "page":
      return value.plain_text
    case "template_mention":
    case "user":
      return null
  }
}
