# react-notion-render

**[Demo](https://xennis.github.io/react-notion-render/)**

Renders the JSON response of the official Notion API as React components. Styling is done via Tailwind CSS.

# Features

- ✅ Render the response of the _official_ Notion API
- ✅ Resolving links
- ✅ Downloading images uploaded to Notion
- ✅ No JavaScript dependencies (except for React itself)
- Internationalization:
  - ✅ `formatDateFn` allows to consider locale
  - ✅ RTL direction is supported
- ✅ Dark mode is supported

Checkout the [Demo](https://xennis.github.io/react-notion-render/).

## Installation

The package is not released yet. Still you can use for example [GitPkg](https://gitpkg.vercel.app/) to install it
(Hint: To pin the version replace `main` by a commit hash)

```shell
# Add the render package
npm install 'https://gitpkg.now.sh/Xennis/react-notion-render/packages/render?main&scripts.install=pnpm%20build'
# (Optional) Add the fetch package
npm install 'https://gitpkg.now.sh/Xennis/react-notion-render/packages/fetch?main&scripts.install=pnpm%20build'
```

Next, add the package to you Tailwind CSS config:

```diff
import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
+   "./node_modules/@react-notion-cms/render/**/*.{js,jsx}",
  ],
}
export default config
```

## Usage

```tsx
import { Client } from "@notionhq/client"
import { fetchBlocksChildren, Render } from "@react-notion-cms/render"
import "@react-notion-cms/render/dist/styles.css"

const client = new Client({ auth: "<NOTION AUTH TOKEN>" })

const blocks = await fetchBlocksChildren(client, { block_id: "<BLOCK UUID>" })

const component = <Render blocks={blocks} />
```

A working example can be found in the [example directory](https://github.com/Xennis/react-notion-render/blob/main/examples/nextjs/src/app/page.tsx).

## Supported blocks

Create a pull request or issue if something is missing.

| Notion Block         | Supported | Note                                                                                                      |
| -------------------- | --------- | --------------------------------------------------------------------------------------------------------- |
| `audio`              | ❌        |                                                                                                           |
| `breadcrumb`         | ❌        |                                                                                                           |
| `bookmark`           | ✅        | without preview image                                                                                     |
| `bulleted_list_item` | ✅        | including nested lists                                                                                    |
| `callout`            | ✅        |                                                                                                           |
| `child_database`     | ❌        |                                                                                                           |
| `child_page`         | ✅        |                                                                                                           |
| `code`               | ✅        | syntax highlighting possible: [Highlight.js example](https://xennis.github.io/react-notion-render/custom) |
| `column`             | ✅        |                                                                                                           |
| `column_list`        | ✅        |                                                                                                           |
| `divider`            | ✅        |                                                                                                           |
| `embed`              | ❌        |                                                                                                           |
| `equation`           | ❌        |                                                                                                           |
| `file`               | ❌        |                                                                                                           |
| `heading_1`          | ✅        | including toggled heading                                                                                 |
| `heading_2`          | ✅        | including toggled heading                                                                                 |
| `heading_3`          | ✅        | including toggled heading                                                                                 |
| `image`              | ✅        |                                                                                                           |
| `link_preview`       | ❌        |                                                                                                           |
| `link_to_page`       | ❌        |                                                                                                           |
| `numbered_list_item` | ✅        | including nested lists                                                                                    |
| `paragraph`          | ✅        |                                                                                                           |
| `pdf`                | ❌        |                                                                                                           |
| `quote`              | ✅        |                                                                                                           |
| `synced_block`       | ✅        |                                                                                                           |
| `table_of_contents`  | ❌        |                                                                                                           |
| `table`              | ✅        |                                                                                                           |
| `table_row`          | ✅        |                                                                                                           |
| `template`           | ❌        |                                                                                                           |
| `to_do`              | ✅        |                                                                                                           |
| `toggle`             | ✅        |                                                                                                           |
| `video`              | ➕        | embed possible: [YouTube example](https://xennis.github.io/react-notion-render/custom)                    |

## Credits

How to render the Notion blocks is inspired by [react-notion-x](https://github.com/NotionX/react-notion-x) started by [Travis Fischer](https://github.com/transitive-bullshit).
