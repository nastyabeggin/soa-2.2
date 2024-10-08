import {createContext} from "react";
import {SortOrder} from "@/app/types/sort";
import {Properties} from "@/app/types/properties";

export type SortOrderMap = {
    [key in Properties]: SortOrder;
};

export const DEFAULT_SORT_ORDER: SortOrderMap = {
    [Properties.ID]: SortOrder.UNDEFINED,
    [Properties.NAME]: SortOrder.UNDEFINED,
    [Properties.DESCRIPTION]: SortOrder.UNDEFINED,
    [Properties.CREATION_DATE]: SortOrder.UNDEFINED,
    [Properties.COORDINATE_X]: SortOrder.UNDEFINED,
    [Properties.COORDINATE_Y]: SortOrder.UNDEFINED,
    [Properties.NUMBER_OF_PARTICIPANTS]: SortOrder.UNDEFINED,
    [Properties.GENRE]: SortOrder.UNDEFINED,
    [Properties.PERSON_NAME]: SortOrder.UNDEFINED,
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
