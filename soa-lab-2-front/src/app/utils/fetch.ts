import {MAIN_FETCH_URL} from "@/app/constants";

export type SearchParamType = {
    key: string;
    value: string;
}

export const fetchUrl = ({path, params, options}: {path: string, params?: SearchParamType[],  options?: RequestInit}): Promise<Response> => {
    let url = `${MAIN_FETCH_URL}${path}`;

    if (params) {
        url += customURLSearchParams(params);
    }

    return fetch(url, options);
};

export function customURLSearchParams(params: SearchParamType[]) {
    let result = '';

    params.forEach(({key, value}, index) => {
        if (index === 0){
            result += `?${key}=${value}`;
        }
        else {
            result += `&${key}=${value}`;
        }
    })
    return result;
}