import {Location} from "@/app/types/location";

export type PersonToBand = {
    id: number;
    name?: string;
    birthday?: string;
    passportID: string;
    location: Location;
}

export type Person = PersonToBand & {
    bandID: number;
}