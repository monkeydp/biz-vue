export default class Paging<T> {
    currentPage = DEFAULT_CURRENT_PAGE
    pageSize = DEFAULT_PAGE_SIZE
    total = 0
    pageCount = 0
    rows = 0
    content: Array<T> = []
}

export interface PagingQueryForm {
    currentPage: number;
    pageSize: number;
}

export const DEFAULT_CURRENT_PAGE = 1
export const DEFAULT_PAGE_SIZE = 10
