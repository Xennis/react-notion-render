import { IconResponse } from "../types"
import { Icon } from "./icon"

export const PageTitle = ({ icon, children }: { icon: IconResponse; children: React.ReactNode }) => {
  return (
    // ref: .notion-page-title
    <span className="inline-flex max-w-full items-center leading-[1.3] transition-[background] delay-[0s] duration-[120ms] ease-[ease-in]">
      {/* ref: .notion-page-title-icon */}
      {/* note: plus ref .notion-page-icon-inline for margins */}
      <Icon icon={icon} width={20} className="me-1.5 ms-0.5 flex shrink-0 items-center justify-center rounded-[3px]" />
      {/* ref: .notion-page-title-text */}
      {/* note: In case of links no border is applied, but otherwise it is. See ref above and `.notion-link .notion-page-title-text` */}
      <span className="relative top-px overflow-hidden text-ellipsis whitespace-nowrap leading-[1.3]">{children}</span>
    </span>
  )
}
