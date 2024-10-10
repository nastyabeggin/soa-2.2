import {GRAMMY_FETCH_URL} from "@/app/constants";
import {Band} from "@/app/types/bands";
import {Single} from "@/app/types/single";
import axios from "axios";
import {Person, PersonToBand} from "@/app/types/person";

async function addSingle(bandId: number, singleData: Single): Promise<Band> {
    const response = await axios.post<Band>(`${GRAMMY_FETCH_URL}/band/${bandId}/singles/add`, singleData);
    return response.data;
}

async function changeSingle(bandId: number, singleId: number, singleData: Single): Promise<Single> {
    const response = await axios.put<Omit<Single, 'id'>>(`${GRAMMY_FETCH_URL}/bands/${bandId}/singles/${singleId}`, singleData);
    return response.data;
}

async function addParticipant(bandId: number, participantData: PersonToBand): Promise<Person> {
    const response = await axios.post<Person>(`${GRAMMY_FETCH_URL}/band/${bandId}/participants/add`, participantData);
    return response.data;
}

export {
    addSingle,
    changeSingle,
    addParticipant
};