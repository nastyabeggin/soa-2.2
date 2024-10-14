import {Single} from "@/app/types/single";

export function convertStringToSingles(text: string) {
    let singles = text.split(new RegExp(/"\s*,/));
    singles = singles.map((single) => single.trim().replace(new RegExp(/^"/), '').replace(new RegExp(/"$/), ''));
    const result: Single[] = singles.map((single) => ({name: single}));
    return result;
}