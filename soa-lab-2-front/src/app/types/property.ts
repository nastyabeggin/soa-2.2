export enum Property {
    ID = 'id',
    NAME = 'name',
    COORDINATE_X = 'coordinates.x',
    COORDINATE_Y = 'coordinates.y',
    CREATION_DATE = 'creationDate',
    NUMBER_OF_PARTICIPANTS = 'numberOfParticipants',
    SINGLES_COUNT = 'singlesCount',
    STUDIO_NAME = 'studio.name',
    GENRE = 'genre'
}

export const PROPERTIES_TEXT = {
    [Property.ID]: 'ID',
    [Property.NAME]: 'Name',
    [Property.COORDINATE_X]: 'Coordinate X',
    [Property.COORDINATE_Y]: 'Coordinate Y',
    [Property.CREATION_DATE]: 'Creation Date',
    [Property.NUMBER_OF_PARTICIPANTS]: 'Number of participants',
    [Property.SINGLES_COUNT]: 'Singles count',
    [Property.STUDIO_NAME]: 'Studio name',
    [Property.GENRE]: 'Genre'
}

export const PROPERTIES_LIST = Object.values(Property);
