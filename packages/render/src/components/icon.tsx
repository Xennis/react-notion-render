import { IconResponse } from "../types"

export const Icon = ({ icon, width }: { icon: IconResponse; width: number }) => {
  switch (icon?.type) {
    case "emoji":
      return (
        <span className="notion-page-icon" role="img">
          {icon.emoji}
        </span>
      )
    case "external":
      return <img src={icon.external.url} width={width} height={width} alt="Icon" className="notion-page-icon" />
    case "file":
    default:
      return <></>
  }
}
