import { cn } from "../util"
import { type CSSProperties } from "react"

export const Toggle = ({
  detailsStyle,
  summaryStyle,
  summary,
  children,
}: {
  detailsStyle?: CSSProperties
  summaryStyle?: CSSProperties
  summary: React.ReactNode
  children: React.ReactNode
}) => {
  return (
    // ref: .notion-toggle
    <details style={detailsStyle} className={"w-full px-0.5 py-[3px]"}>
      {/* note(): CSS `outline-solid: none;` instead of TW `outline-hidden` would be correct here */}
      {/* note(added): Without the bottom padding for example a normal paragraph is too close. It looks strange. */}
      <summary style={summaryStyle} className="cursor-pointer pb-2 outline-hidden">
        {summary}
      </summary>
      <div className="ms-[1.2em]">{children}</div>
    </details>
  )
}
