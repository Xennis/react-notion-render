import { type PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"

import { classNames } from "../util"

// Just a helper type because it's not directly exposed.
// Technically it's a page property but all icons (e.g. in databases too) have internally the same type.
type Icon = PageObjectResponse["icon"]

export const Icon = ({ icon, width }: { icon: Icon; width: number }) => {
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
