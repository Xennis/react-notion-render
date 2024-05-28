import { classNames } from "../util"
import { type CSSProperties } from "react"

export const Toggle = ({
  className,
  summaryStyle,
  summary,
  children,
}: {
  className?: string
  summaryStyle?: CSSProperties
  summary: React.ReactNode
  children: React.ReactNode
}) => {
  return (
    // ref: .notion-toggle
    <details className={classNames("w-full px-0.5 py-[3px]", className ?? "")}>
      {/* note(): CSS `outline: none;` instead of TW `outline-none` would be correct here */}
      {/* note(added): Without the bottom padding for example a normal paragraph is too close. It looks strange. */}
      <summary style={summaryStyle} className="cursor-pointer pb-2 outline-none">
        {summary}
      </summary>
      <div className="ms-[1.1em]">{children}</div>
    </details>
  )
}
