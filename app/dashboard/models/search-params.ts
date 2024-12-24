import { createSearchParamsCache, parseAsInteger } from 'nuqs/server'

export const searchParamsCache = createSearchParamsCache({
  pageIndex: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(10),
})
