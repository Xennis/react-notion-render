import {
  MentionRichTextItemResponse,
  RichTextItemResponse,
  RichTextItemResponseCommon,
  TextRichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints"

import { cn, notionColor, notionLinkToUuid } from "../util"
import { RenderOptions } from "../types"
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
      const mention = <FormattedText annotations={value.annotations}>{mentionContent}</FormattedText>
      if (value.href === null) {
        return mention
      }

      const uuid = notionLinkToUuid(value.href)
      const resolvedLink = uuid !== null ? options.resolveLinkFn(uuid) : null
      if (resolvedLink === null) {
        // If the URL can't be resolved make it an external link.
        return (
          <options.htmlComponents.a href={value.href} target="_blank">
            {mention}
          </options.htmlComponents.a>
        )
      }
      return (
        <options.htmlComponents.a href={resolvedLink.href}>
          <PageTitle icon={resolvedLink.icon}>{mention}</PageTitle>
        </options.htmlComponents.a>
      )

    case "text":
      const text = <FormattedText annotations={value.annotations}>{value.text.content}</FormattedText>
      const textUrl = value.text.link?.url
      if (!textUrl) {
        return text
      }
      // Relative Url
      if (textUrl.startsWith("/")) {
        const uuid = notionLinkToUuid(textUrl)
        const resolvedLink = uuid !== null ? options.resolveLinkFn(uuid) : null
        return (
          <options.htmlComponents.a href={resolvedLink?.href ?? "#"}>
            {/* No PageTitle here. It's a regular link. */}
            {text}
          </options.htmlComponents.a>
        )
      }
      return (
        <options.htmlComponents.a href={textUrl} target="_blank">
          {text}
        </options.htmlComponents.a>
      )
  }
}

const FormattedText = ({
  annotations,
  children,
}: {
  annotations: RichTextItemResponseCommon["annotations"]
  children: React.ReactNode
}) => {
  // ref: .notion-inline-underscore (+ b, i & s)
  // whitespace-pre-wrap: Otherwise line breaks are not shown.
  const result = (
    <span
      style={notionColor(annotations.color)}
      className={cn(
        "whitespace-pre-wrap",
        annotations.bold ? "font-semibold" : "",
        annotations.italic ? "italic" : "",
        annotations.strikethrough ? "line-through" : "",
        annotations.underline ? "underline" : "",
      )}
    >
      {children}
    </span>
  )
  if (!annotations.code) {
    return result
  }
  // ref: .notion-inline-code
  return (
    <code className="bg-(--bg-color-2) rounded-[3px] px-[0.4em] py-[0.2em] font-mono text-[85%] text-[#ff4081]">
      {result}
    </code>
  )
}

const mentionText = (value: MentionRichTextItemResponse, formatDateFn: (dateString: string) => string) => {
  switch (value.mention.type) {
    case "database":
      return null
    case "date":
      try {
        let dateText = formatDateFn(value.mention.date.start)
        if (value.mention.date.end) {
          dateText += ` → ${formatDateFn(value.mention.date.end)}`
        }
        // Ignored: value.mention.date.time_zone
        return dateText
      } catch (error) {
        console.warn("failed to parse date", value.mention.date, error)
        return null
      }
    case "link_preview":
      return null
    case "page":
    case "template_mention":
    case "user":
      return null
  }
}
