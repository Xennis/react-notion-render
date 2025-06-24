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

## Packages

| Package dir | NPM version                                                                                                                                       | Size                                                                                                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fetch`     | [![NPM version](https://img.shields.io/npm/v/@xennis/react-notion-cms-fetch.svg)](https://www.npmjs.com/package/@xennis/react-notion-cms-fetch)   | [![NPM bundle size](https://img.shields.io/bundlephobia/minzip/@xennis/react-notion-cms-fetch.svg)](https://bundlephobia.com/package/@xennis/react-notion-cms-fetch)   |
| `render`    | [![NPM version](https://img.shields.io/npm/v/@xennis/react-notion-cms-render.svg)](https://www.npmjs.com/package/@xennis/react-notion-cms-render) | [![NPM bundle size](https://img.shields.io/bundlephobia/minzip/@xennis/react-notion-cms-render.svg)](https://bundlephobia.com/package/@xennis/react-notion-cms-render) |

## Installation

```shell
# Add the render package
npm install @xennis/react-notion-cms-render
# (Optional) Add the fetch package
npm install @xennis/react-notion-cms-fetch
```

Next, add the package to you Tailwind CSS config:

```diff
import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
+   "./node_modules/@xennis/react-notion-cms-render/**/*.{js,jsx}",
  ],
}
export default config
```

## Usage

```tsx
import { Client } from "@notionhq/client"
import { fetchBlocksChildren, Render } from "@xennis/react-notion-cms-render"
import "@xennis/react-notion-cms-render/dist/styles.css"

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

## Logging

The Notion client is not encapsulated, so you can enable logging as you normally would with the official Notion client.

```tsx
import { Client, LogLevel } from "@notionhq/client"

const client = new Client({
  auth: "<NOTION AUTH TOKEN>",
  logLevel: LogLevel.DEBUG,
})
```

## Credits

How to render the Notion blocks is inspired by [react-notion-x](https://github.com/NotionX/react-notion-x) started by [Travis Fischer](https://github.com/transitive-bullshit).
