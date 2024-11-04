import {Band, BandDTO, BandUpdateDTO} from "@/app/types/bands";
import {PaginatedResponse} from "@/app/types/response";
import {PaginatedRequest} from "@/app/types/request";
import {fetchUrl, getErrorMessage, getErrorMessages, SearchParamType} from "@/app/utils/fetch";
import {XMLBuilder, XMLParser} from 'fast-xml-parser';

function parseXML(xmlData: string) {
    const parser = new XMLParser();
    const jsonObj = parser.parse(xmlData);
    console.log("xmlData:", xmlData);
    console.log("jsonObj:", jsonObj);
    if (jsonObj && typeof jsonObj === 'object' && jsonObj.hasOwnProperty('List')) {
        const innerElements = jsonObj.List;
        return innerElements.item;
    }
    if (jsonObj && typeof jsonObj === 'object' && jsonObj.hasOwnProperty('MusicBands')) {
        const musicBands = jsonObj.MusicBands;
        if (musicBands && musicBands.data) {
            console.log("musicBands", musicBands);
            let arrayData: any[] = [];
            if (Array.isArray(musicBands.data.data)) {
                arrayData = musicBands.data.data; // It's an array
            } else if (musicBands.data.data) {
                arrayData = [musicBands.data.data]; // Single object wrapped in an array
            }
            const unwrappedData = arrayData.map((item: any) => {
                return {
                    id: item.id,
                    name: item.name,
                    coordinates: item.coordinates,
                    creationDate: item.creationDate,
                    numberOfParticipants: item.numberOfParticipants,
                    singlesCount: item.singlesCount,
                    albumsCount: item.albumsCount,
                    genre: item.genre,
                    studio: item.studio
                };
            });
            console.log("unwrapped data is", unwrappedData);
            return {
                data: unwrappedData,
                total: musicBands.total,
                totalPages: musicBands.totalPages,
                currentPage: musicBands.currentPage,
                size: musicBands.size
            };
        } else {
            return {
                data: [],
                total: musicBands.total,
                totalPages: musicBands.totalPages,
                currentPage: musicBands.currentPage,
                size: musicBands.size
            };
        }
    }
    if (jsonObj && typeof jsonObj === 'object' && jsonObj.hasOwnProperty('SinglesCount')) {
        const innerElements = jsonObj.SinglesCount.count;
        console.log("inner", innerElements);
        return innerElements;
    }
    console.log(jsonObj);
    return jsonObj;
}

function jsonToXML(jsonData: string, mainTag: string): string {
    const builder = new XMLBuilder({
        ignoreAttributes: false,
        format: true,
        suppressEmptyNode: false,
    });

    const jsonObject = JSON.parse(jsonData);
    const xmlData = builder.build(jsonObject);
    console.log(xmlData);
    const res = `<${mainTag}>\n${xmlData}</${mainTag}>`;
    console.log(res);

    return `<${mainTag}>\n${xmlData}\n</${mainTag}>`;
}


async function createBand(bandData: BandDTO): Promise<Band> {
    try {
        const response = await fetchUrl({ path: '/music-bands', options: {
            method: 'POST',
            body: jsonToXML(JSON.stringify(bandData), 'MusicBand'),
            headers: { 'Content-Type': 'application/xml' }
        }});

        if (!response.ok) return response.text().then(text => { throw new Error(getErrorMessages(text))})

        return parseXML(await response.text());
    } catch (error) {
        throw error;
    }
}

async function getBands({
    sort,
    filter,
    page,
    size
}: PaginatedRequest): Promise<PaginatedResponse<Band>> {
    try {
        console.log("size is: ", size);
        const params: SearchParamType[] = [];
        if (page === undefined && size === undefined && sort === undefined && filter === undefined) {
            console.log("UNDEFINED");
        }
        if (page !== undefined) params.push({ key: 'page', value: String(page)});
        if (size !== undefined) params.push({ key: 'size', value: String(size)});
        if (sort !== undefined) params.push({ key: 'sort', value: sort});
        if (filter !== undefined) params.push({ key: 'filter', value: filter});

        const response = await fetchUrl({path: '/music-bands', params, options: {
            method: 'GET',
        }});

        if (!response.ok) return response.text().then(text => { throw new Error(getErrorMessage(text)) })

        return parseXML(await response.text());
    } catch (error) {
        throw error;
    }
}

async function getBandById(id: number): Promise<Band> {
    try {
        const response = await fetchUrl({path: `/music-bands/${id}`,  options: {
                method: 'GET',
            }});

        if (!response.ok) return response.text().then(text => { throw new Error(getErrorMessage(text)) })

        return parseXML(await response.text());
    } catch (error) {
        throw error;
    }
}

async function deleteBandById(id: number): Promise<void> {
    try {
        const response = await fetchUrl({path: `/music-bands/${id}`,  options: {
                method: 'DELETE',
            }});

        if (!response.ok) return response.text().then(text => { throw new Error(getErrorMessage(text)) })
    } catch (error) {
        throw error;
    }
}

async function updateBandById(id: number, bandData: Partial<BandUpdateDTO>): Promise<Band> {
    try {
        const response = await fetchUrl({path: `/music-bands/${id}`,  options: {
                method: 'PATCH',
                body: jsonToXML(JSON.stringify(bandData), "MusicBand"),
                headers: { 'Content-Type': 'application/xml' }
            }});

        if (!response.ok) return response.text().then(text => { throw new Error(getErrorMessages(text)) })

        return parseXML(await response.text());
    } catch (error) {
        throw error;
    }
}

async function getAllGenres(): Promise<string[]> {
    try {
        const response = await fetchUrl({path: `/music-bands/genre`,  options: {
                method: 'GET',
            }});

        if (!response.ok) return response.text().then(text => { throw new Error(getErrorMessage(text)) })
        return parseXML(await response.text());
    } catch (error) {
        throw error;
    }
}

async function getBandsByGenre(genre: string): Promise<[Band]> {
    try {
        if (genre === "") genre = "POP";
        const response = await fetchUrl({path: `/bands/get-by-genre/${genre}`,  options: {
                method: 'GET'
            }, mainApi: false});
        if (!response.ok) return response.text().then(text => { throw new Error(getErrorMessage(text)) })
        return parseXML(await response.text());
    } catch (error) {
        throw error;
    }
}


async function getSinglesCount(): Promise<number> {
    try {
        const response = await fetchUrl({path: `/music-bands/singles-count-sum`,  options: {
                method: 'GET',
            }});

        if (!response.ok) return response.text().then(text => { throw new Error(getErrorMessage(text)) })

        return parseXML(await response.text());
    } catch (error) {
        throw error;
    }
}

async function getBandsByDate(): Promise<string[]> {
    try {
        const response = await fetchUrl({path: `/music-bands/count-by-creation-date`,  options: {
                method: 'GET',
            }});

        if (!response.ok) return response.text().then(text => { throw new Error(getErrorMessage(text)) })

        return parseXML(await response.text());
    } catch (error) {
        throw error;
    }
}

async function nominateBand(id: number, genre: string): Promise<void> {
    try {
        const response = await fetchUrl({path: `/band/${id}/nominate/${genre}`, options: {
                method: 'POST',
            }, mainApi: false});

        if (!response.ok) return response.text().then(text => { throw new Error(text) });
    } catch (error) {
        throw error;
    }
}

export {
    createBand,
    getBands,
    getBandById,
    deleteBandById,
    updateBandById,
    getAllGenres,
    getBandsByGenre,
    getSinglesCount,
    getBandsByDate,
    nominateBand
}

