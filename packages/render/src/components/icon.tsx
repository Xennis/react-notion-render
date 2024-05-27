import { IconResponse } from "../types"
import { classNames } from "../util"

export const Icon = ({ icon, width, className }: { icon: IconResponse; width: number; className?: string }) => {
  switch (icon?.type) {
    case "emoji":
      return (
        <span className="notion-page-icon" role="img">
          {icon.emoji}
        </span>
      )
    case "external":
      return (
        <img
          src={icon.external.url}
          width={width}
          height={width}
          alt="Icon"
          className={classNames("notion-page-icon", className ?? "")}
        />
      )
    case "file":
    default:
      return <></>
  }
}
