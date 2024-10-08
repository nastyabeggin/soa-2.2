import {createContext} from "react";

export const DEFAULT_PAGE = 1;
export const DEFAULT_SIZE = 10;

export const TOTAL_PAGES = 15;

export const PaginationContext = createContext({
    page: DEFAULT_PAGE,
    setPage: (page: number) => {},
    size: DEFAULT_SIZE,
    setSize: (size: number) => {},
})