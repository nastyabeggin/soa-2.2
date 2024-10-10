import {FilterMap} from "@/app/context/filter";

export const getFilterQuery = (filterMap: FilterMap) => {
    const appliedFilters = Object.entries(filterMap)
        .filter(([key, filter]) => filter.value !== undefined && filter.operator !== undefined)
        .map(([key, filter], index) => {
            if (index === 0) return `${key}[${filter.operator}]${filter.value}`;
            return `filter=${key}[${filter.operator}]${filter.value}`;
        })

    return appliedFilters.length > 0 ? encodeURIComponent(appliedFilters.join('&')) : undefined;
}