import {createContext} from "react";
import {SortKeys, SortOrder} from "@/app/types/sort";

export type SortOrderMap = {
    [key in SortKeys]: SortOrder;
};

export const DEFAULT_SORT_ORDER: SortOrderMap = {
    [SortKeys.ID]: SortOrder.UNDEFINED,
    [SortKeys.NAME]: SortOrder.UNDEFINED,
    [SortKeys.DESCRIPTION]: SortOrder.UNDEFINED,
    [SortKeys.CREATION_DATE]: SortOrder.UNDEFINED,
    [SortKeys.X]: SortOrder.UNDEFINED,
    [SortKeys.Y]: SortOrder.UNDEFINED,
    [SortKeys.MEMBERS]: SortOrder.UNDEFINED,
    [SortKeys.GENRE]: SortOrder.UNDEFINED,
    [SortKeys.FRONTMAN]: SortOrder.UNDEFINED,
    [SortKeys.SINGLE]: SortOrder.UNDEFINED,
}

export const SortContext = createContext({
    sortOrder: DEFAULT_SORT_ORDER,
    setSortOrder: (update: SortOrderMap) => {}
});

export const transitionSortOrder = (sortOrder: SortOrder) => {
    switch(sortOrder) {
        case SortOrder.ASC:
            return SortOrder.DESC;
        case SortOrder.DESC:
            return SortOrder.UNDEFINED;
        case SortOrder.UNDEFINED:
            return SortOrder.ASC;
    }
}
