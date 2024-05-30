import { Render } from "@react-notion-cms/render"
import { getCachedPageContent } from "@/lib/fetchers"

export default async function HomePage() {
  const blocks = await getCachedPageContent(process.env.NOTION_BLOCK_ID!)

  return (
    <Render
      blocks={blocks}
      options={{
        resolveLinkFn: (nId) => ({ href: nId, icon: null }),
      }}
    />
  )
}
