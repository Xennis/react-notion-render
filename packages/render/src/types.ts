import type { BlockObjectResponse, PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import type { JSX } from "react"

export type BlockObjectResponseWithChildren = BlockObjectResponse & {
  _children?: Array<BlockObjectResponseWithChildren>
}

// Just a helper type because it's not directly exposed.
// Technically it's a page property but all icons (e.g. in databases too) have internally the same type.
export type IconResponse = PageObjectResponse["icon"]

export type RenderOptions = {
  formatDateFn: (date: Date) => string
  resolveLinkFn: (nId: string) => { href: string; icon: IconResponse | null } | null
  htmlComponents: {
    a: (props: React.ComponentPropsWithoutRef<"a">) => JSX.Element
  }
}
