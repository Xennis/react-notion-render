import { HTMLAttributeAnchorTarget } from "react"
import { Icon } from "./icon"
import { IconResponse } from "../types"

export const Link = ({
  href,
  target,
  children,
}: {
  href: string | null
  target?: HTMLAttributeAnchorTarget | undefined
  children: React.ReactNode
}) => {
  return (
    <a className="notion-link" href={href !== null ? href : "#"} target={target}>
      {children}
    </a>
  )
}

export const PageTitle = ({ icon, children }: { icon: IconResponse | null; children: React.ReactNode }) => {
  return (
    <span className="notion-page-title">
      {icon && <Icon icon={icon} width={20} className="notion-page-title-icon" />}
      <span className="notion-page-title-text">{children}</span>
    </span>
  )
}
