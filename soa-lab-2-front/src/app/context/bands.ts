import {createContext} from "react";

export const BandsContext = createContext({
    canFetch: 0,
    setCanFetch: (canFetch: number) => {}
})