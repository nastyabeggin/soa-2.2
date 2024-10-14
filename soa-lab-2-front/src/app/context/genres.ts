import {createContext} from "react";

export const GenresContext = createContext({
    genres: [] as string[],
    setGenres: (genres: string[]) => {}
})