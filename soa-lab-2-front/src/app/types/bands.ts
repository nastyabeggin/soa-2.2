import {Coordinates} from "@/app/types/location";
import {Genre} from "@/app/types/genre";
import {PersonToBand} from "@/app/types/person";
import {Single} from "@/app/types/single";

export type Band = {
    id: number;
    name: string;
    coordinates: Coordinates;
    creationDate: string;
    numberOfParticipants: number;
    description: string;
    genre: Genre;
    frontMan?: PersonToBand;
    singles?: Single[];
}