import type {
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints"


export type BlockObjectResponseWithChildren = BlockObjectResponse & {
  _children?: Array<BlockObjectResponseWithChildren>
}
