# react-notion-render

**[Demo](https://xennis.github.io/react-notion-render/)**

Renders the JSON response of the official Notion API as React components. Styling is done via TailwindCSS.

# Package `render`

Features

- ✅ Render the response of the _official_ Notion API
- ✅ No JavaScript dependencies (except for React itself)
- Internationalization:
  - ✅ `formatDateFn` allows to consider locale
  - ✅ RTL direction is supported
- ✅ Dark mode is supported

## Supported blocks

| Notion Block         | Supported | Note                      |
| -------------------- | --------- | ------------------------- |
| `audio`              | ❌        |                           |
| `breadcrumb`         | ❌        |                           |
| `bookmark`           | ✅        | without preview image     |
| `bulleted_list_item` | ✅        | including nested lists    |
| `callout`            | ✅        |                           |
| `child_database`     | ❌        |                           |
| `child_page`         | ✅        |                           |
| `code`               | 🟡        | plannned                  |
| `column`             | ✅        |                           |
| `column_list`        | ✅        |                           |
| `divider`            | ✅        |                           |
| `embed`              | ❌        |                           |
| `equation`           | ❌        |                           |
| `file`               | ❌        |                           |
| `heading_1`          | ✅        | including toggled heading |
| `heading_2`          | ✅        | including toggled heading |
| `heading_3`          | ✅        | including toggled heading |
| `image`              | ✅        |                           |
| `link_preview`       | ❌        |                           |
| `link_to_page`       | ❌        |                           |
| `numbered_list_item` | ✅        | including nested lists    |
| `paragraph`          | ✅        |                           |
| `pdf`                | ❌        |                           |
| `quote`              | ✅        |                           |
| `synced_block`       | ✅        |                           |
| `table_of_contents`  | ❌        |                           |
| `table`              | ✅        |                           |
| `table_row`          | ✅        |                           |
| `template`           | ❌        |                           |
| `to_do`              | ✅        |                           |
| `toggle`             | ✅        |                           |
| `video`              | 🟡        | planned                   |

## Usage

```typescript
import { Client } from "@notionhq/client"
import { fetchBlocksChildren } from "@react-notion-cms/render"

const client = new Client({ auth: "<NOTION AUTH TOKEN>" })

const blocks = fetchBlocksChildren(client, { block_id: "<BLOCK UUID>" }, {})
```
