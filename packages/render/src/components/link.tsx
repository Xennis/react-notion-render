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
    // ref: .notion-link
    <a
      style={{ transition: "border-color 100ms ease-in,opacity 100ms ease-in" }}
      className="break-words border-b-[0.05em] border-solid border-[--fg-color-2] text-inherit decoration-inherit opacity-70 hover:border-[--fg-color-6] hover:opacity-100"
      href={href !== null ? href : "#"}
      target={target}
    >
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
