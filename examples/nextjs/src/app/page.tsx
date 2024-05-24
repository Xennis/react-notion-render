import {fetchBlocksChildren, Render} from "@react-notion-render/render";
import {Client} from "@notionhq/client";

import "@react-notion-render/render/styles.css"

const notionClient = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
})

export default async function Home() {
  const blocks = await fetchBlocksChildren(notionClient, process.env.NOTION_BLOCK_ID!)
  return (
    <main className="max-w-screen-lg mx-auto">
      <Render blocks={blocks} />
    </main>
  );
}
