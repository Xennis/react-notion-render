import { IconResponse } from "../types"
import { Icon } from "./icon"

export const PageTitle = ({ icon, children }: { icon: IconResponse; children: React.ReactNode }) => {
  if (icon === null) {
    return <>{children}</>
  }
  return (
    // ref: .notion-page-title
    <span className="inline-flex max-w-full items-center">
      {/* ref: .notion-page-title-icon */}
      {/* note: plus ref .notion-page-icon-inline for margins */}
      <Icon icon={icon} width={18} className="me-1.5 ms-0.5 flex shrink-0 justify-center rounded" />
      {/* ref: .notion-page-title-text */}
      {/* note: In case of links no border is applied, but otherwise it is. See ref above and `.notion-link .notion-page-title-text` */}
      <span className="overflow-hidden text-ellipsis whitespace-nowrap underline decoration-[--fg-color-2] underline-offset-2 hover:no-underline">
        {children}
      </span>
    </span>
  )
}
