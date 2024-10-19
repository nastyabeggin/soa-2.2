export enum Genre {
    POP = 'Pop',
    MATH_ROCK = 'Math Rock',
    BRIT_POP = 'Brit Pop'
}

export const GenreText = {
    [Genre.POP]: 'POP',
    [Genre.MATH_ROCK]: 'MATH_ROCK',
    [Genre.BRIT_POP]: 'BRIT_POP',
}

export const GENRES: Genre[] = Object.values(Genre);