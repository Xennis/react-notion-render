import { HTMLAttributeAnchorTarget } from "react"
import { IconResponse } from "../types"

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
      {children}
    </a>
  )
}
