import {Single} from "@/app/types/single";

export function convertStringToSingles(text: string) {
    if (text.length && text.indexOf('"') === -1) throw new Error("Please use brackets to enter singles");

    let singles = text.split(new RegExp(/"\s*,/));

    if (singles.length !== text.match(/"/)?.length) throw new Error("Please use brackets fo each single twice");

    singles = singles.map((single) => single.trim().replace(new RegExp(/^"/), '').replace(new RegExp(/"$/), ''));
    const result: Single[] = singles.map((single) => ({name: single}));
    return result;
}