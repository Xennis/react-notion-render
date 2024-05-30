import { IconResponse } from "../types"
import { Icon } from "./icon"

export const PageTitle = ({ icon, children }: { icon: IconResponse | null; children: React.ReactNode }) => {
  return (
    <span className="notion-page-title">
      {icon && <Icon icon={icon} width={20} className="notion-page-title-icon" />}
      <span className="notion-page-title-text">{children}</span>
    </span>
  )
}
