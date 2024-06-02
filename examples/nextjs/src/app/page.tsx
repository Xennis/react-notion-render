import { Render } from "@react-notion-cms/render"
import { getCachedPageContent } from "@/lib/fetchers"

export default async function HomePage() {
  const blocks = await getCachedPageContent("12335068-18bf-4cd4-b692-ae6d052d6b03")

  return (
    <Render
      blocks={blocks}
      options={{
        // See custom page for an example
        resolveLinkFn: (nId) => ({ href: nId, icon: null }),
      }}
    />
  )
}
