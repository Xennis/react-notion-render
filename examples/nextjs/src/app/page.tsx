import {fetchBlocksChildren, Render} from "@react-notion-render/render";
import {Client} from "@notionhq/client";

const notionClient = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
})

export default async function Home() {
  const blocks = await fetchBlocksChildren(notionClient, process.env.NOTION_BLOCK_ID!)
  return (
    <main>
      <Render blocks={blocks} />
    </main>
  );
}
