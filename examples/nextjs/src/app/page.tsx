import { fetchBlocksChildren, Render } from "@react-notion-cms/render"
import { Client } from "@notionhq/client"

import "@react-notion-cms/render/styles.css"

const notionClient = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
})
const demoLocale = "en_US"

const formatDateFn = (date: Date) => {
  return date.toLocaleDateString(demoLocale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export default async function Home() {
  const blocks = await fetchBlocksChildren(notionClient, process.env.NOTION_BLOCK_ID!)
  return (
    <main className="mx-auto max-w-screen-lg">
      <Render
        blocks={blocks}
        options={{ formatDateFn: formatDateFn, resolveLinkFn: (nId) => ({ href: nId, icon: null }) }}
      />
    </main>
  )
}
