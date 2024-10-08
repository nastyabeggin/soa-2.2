export enum FilterType {
    GT = 'gt',
    GTE = 'gte',
    LT = 'lt',
    LTE = 'lte',
    EQ = 'eq',
    NEQ = 'neq',
    CONTAIN = 'contain'
}

export const FilterText = {
    [FilterType.GT]: '>',
    [FilterType.GTE]: '>=',
    [FilterType.LT]: '<',
    [FilterType.LTE]: '<=',
    [FilterType.EQ]: '=',
    [FilterType.NEQ]: '!=',
    [FilterType.CONTAIN]: '~',
}