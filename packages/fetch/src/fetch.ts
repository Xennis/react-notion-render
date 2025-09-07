import { type Client, isFullPage, iteratePaginatedAPI } from "@notionhq/client"
import type { PageObjectResponse, QueryDataSourceParameters } from "@notionhq/client/build/src/api-endpoints"

export const fetchDatabasePages = async <T>(
  client: Client,
  processFn: (page: PageObjectResponse) => Promise<T | null>,
  firstPageArgs: QueryDataSourceParameters,
): Promise<Array<T>> => {
  const result: Array<T> = []
  for await (const item of iteratePaginatedAPI(client.dataSources.query, firstPageArgs)) {
    if (isFullPage(item)) {
      const fnResult = await processFn(item)
      if (fnResult !== null) {
        result.push(fnResult)
      }
    }
  }
  return result
}
