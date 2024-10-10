import {FilterMap} from "@/app/context/filter";

export const getFilterQuery = (filterMap: FilterMap) => {
    const appliedFilters = Object.entries(filterMap)
        .filter(([key, filter]) => filter.value !== undefined && filter.operator !== undefined)
        .map(([key, filter], index) => {
            if (index === 0) return encodeURIComponent(`${key}[${filter.operator}]${filter.value}`);
            return encodeURIComponent(`filter=${key}[${filter.operator}]${filter.value}`);
        })

    return appliedFilters.length > 0 ? appliedFilters.join('&') : undefined;
}