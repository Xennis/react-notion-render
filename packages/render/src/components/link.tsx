import { HTMLAttributeAnchorTarget } from "react"
import { IconResponse } from "../types"
import { Icon } from "./icon"

// TODO: Split into Link and PageLink?
export const Link = ({
  href,
  icon,
  target,
  children,
}: {
  href: string | null
  icon?: IconResponse | null
  target?: HTMLAttributeAnchorTarget | undefined
  children: React.ReactNode
}) => {
  return (
    <a className="notion-link" href={href !== null ? href : "#"} target={target}>
      {icon !== undefined && icon !== null && <Icon icon={icon} width={20} />}
      {children}
    </a>
  )
}
