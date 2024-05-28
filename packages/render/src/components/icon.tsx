import { IconResponse } from "../types"
import { classNames } from "../util"

export const Icon = ({ icon, width, className }: { icon: IconResponse; width: number; className?: string }) => {
  // ref: .notion-page-icon
  // note(missing): font-family: "Apple Color Emoji", "Segoe UI Emoji", NotoColorEmoji, "Noto Color Emoji", "Segoe UI Symbol", "Android Emoji", EmojiSymbols;*/
  className = classNames("text-[1.1em] fill-[--fg-color-6] text-[--fg-color-icon]", className ?? "")
  switch (icon?.type) {
    case "emoji":
      return (
        <span className={className} role="img">
          {icon.emoji}
        </span>
      )
    case "external":
      return (
        // note: img.notion-page-icon AND svg.notion-page-icon have this style. Not svg yet.
        <img
          src={icon.external.url}
          width={width}
          height={width}
          alt="Icon"
          className={classNames("block max-h-full max-w-full rounded-[3px] object-fill", className)}
        />
      )
    case "file":
    default:
      return <></>
  }
}
