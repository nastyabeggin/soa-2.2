import {SortOrderMap} from "@/app/context/sort";
import {SortOrder} from "@/app/types/sort";

export const getSortQuery = (sortMap: SortOrderMap) => {
    const appliedSorts = Object.entries(sortMap)
        .filter(([key, order]) => order !== SortOrder.UNDEFINED)
        .map(([key, order], index) => {
            if (index === 0) return encodeURIComponent(`${key}[${order}]`);
            return encodeURIComponent(`sort=${key}[${order}]`);
        });

    return appliedSorts.length > 0 ? appliedSorts.join('&') : undefined;
}