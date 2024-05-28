import { Render } from "@react-notion-cms/render"
import { getCachedPageContent } from "@/lib/fetchers"

import "@react-notion-cms/render/src/thirdparty/react-notion-x/styles.css"

const demoLocale = "en_US"

const formatDateFn = (date: Date) => {
  return date.toLocaleDateString(demoLocale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export default async function Home() {
  const blocks = await getCachedPageContent(process.env.NOTION_BLOCK_ID!)
  return (
    <main className="mx-auto max-w-screen-lg">
      <Render
        blocks={blocks}
        options={{ formatDateFn: formatDateFn, resolveLinkFn: (nId) => ({ href: nId, icon: null }) }}
      />
    </main>
  )
}
