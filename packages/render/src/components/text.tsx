import type { CSSProperties } from "react"
import type { MentionRichTextItemResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"

import { cn, notionColor, relativeNotionUrl } from "../util"
import { RenderOptions } from "../types"
import { A } from "./html/a"
import { PageTitle } from "./page-title"

export const RichTexts = ({ value, options }: { value: Array<RichTextItemResponse>; options: RenderOptions }) => {
  return (
    <>
      {value.map((t, index) => (
        <RichText key={index} value={t} options={options} />
      ))}
    </>
  )
}

const RichText = ({ value, options }: { value: RichTextItemResponse; options: RenderOptions }) => {
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
      // FIXME(post-mvp): Merge annotations with "text".
      if (value.annotations.color) {
        result = <span style={notionColor(value.annotations.color)}>{result}</span>
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
        result = (
          <ResolvedLink url={mentionUrl} options={options}>
            {result}
          </ResolvedLink>
        )
      }
      return result
    case "text":
      // ref: .notion-inline-underscore (+ b, i & s)
      // whitespace-pre-wrap: Otherwise line breaks are not shown.
      let text = (
        <span
          style={notionColor(value.annotations.color)}
          className={cn(
            "whitespace-pre-wrap",
            value.annotations.bold ? "font-semibold" : "",
            value.annotations.italic ? "italic" : "",
            value.annotations.strikethrough ? "line-through" : "",
            value.annotations.underline ? "underline" : "",
          )}
        >
          {value.text.content}
        </span>
      )
      if (value.annotations.code) {
        // ref: .notion-inline-code
        text = (
          <code className="rounded-[3px] bg-[--bg-color-2] px-[0.4em] py-[0.2em] font-mono text-[85%] text-[#ff4081]">
            {text}
          </code>
        )
      }

      const textUrl = value.text.link?.url ?? null
      if (textUrl) {
        return (
          <ResolvedLink url={textUrl} options={options}>
            {text}
          </ResolvedLink>
        )
      }
      return <>{text}</>
  }
}

const ResolvedLink = ({
  url,
  options,
  children,
}: {
  url: string
  options: RenderOptions
  children: React.ReactNode
}) => {
  const isRelative = url.startsWith("/")
  if (!isRelative) {
    return (
      <options.htmlComponents.a href={url} target="_blank">
        {children}
      </options.htmlComponents.a>
    )
  }
  const resolvedLink = options.resolveLinkFn(url.substring(1)) // remove the leading
  return (
    <options.htmlComponents.a href={resolvedLink?.href ?? "#"}>
      <PageTitle icon={resolvedLink?.icon ?? null}>{children}</PageTitle>
    </options.htmlComponents.a>
  )
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
        // Ignored: value.mention.date.time_zone
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
