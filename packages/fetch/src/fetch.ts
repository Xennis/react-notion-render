import { type Client, isFullPage, iteratePaginatedAPI } from "@notionhq/client"
import { type PageObjectResponse, type QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints"

export const fetchDatabasePages = async <T>(
  client: Client,
  processFn: (page: PageObjectResponse) => Promise<T | null>,
  firstPageArgs: QueryDatabaseParameters,
): Promise<Array<T>> => {
  const result: Array<T> = []
  for await (const item of iteratePaginatedAPI(client.databases.query, firstPageArgs)) {
    if (isFullPage(item)) {
      const fnResult = await processFn(item)
      if (fnResult !== null) {
        result.push(fnResult)
      }
    }
  }
  console.info(`fetched ${result.length} pages from notion database ${firstPageArgs.database_id}`)
  return result
}
