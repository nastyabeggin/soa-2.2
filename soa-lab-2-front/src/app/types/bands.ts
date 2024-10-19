import {Coordinates, Studio} from "@/app/types/location";

export type Band = {
    id: number;
    name: string;
    coordinates: Coordinates;
    creationDate: string;
    numberOfParticipants: number;
    albumsCount: number;
    singlesCount: number;
    studio: Studio;
    genre: string;
}

export type BandDTO = {
    name: string;
    coordinates: Omit<Coordinates, 'id'>;
    numberOfParticipants: number;
    singlesCount: number;
    albumsCount: number;
    genre: string;
    studio?: Omit<Studio, 'id'>;
}

export type BandUpdateDTO = {
    name: string;
    coordinates: Omit<Coordinates, 'id'>;
    numberOfParticipants: number;
    singlesCount: number;
    albumsCount: number;
    genre: string;
    studio?: Omit<Studio, 'id'>;
}
