import {Band, BandDTO} from "@/app/types/bands";
import {PaginatedResponse} from "@/app/types/response";
import {Genre} from "@/app/types/genre";
import {PaginatedRequest} from "@/app/types/request";
import {fetchUrl, SearchParamType} from "@/app/utils/fetch";

async function createBand(bandData: BandDTO): Promise<Band> {
    try {
        const response = await fetchUrl({ path: '/bands', options: {
            method: 'POST',
            body: JSON.stringify(bandData),
            headers: { 'Content-Type': 'application/json' }
        }});
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error creating band:', error);
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
        const params: SearchParamType[] = [];
        if (page !== undefined) params.push({ key: 'page', value: String(page)});
        if (size !== undefined) params.push({ key: 'size', value: String(size)});
        if (sort !== undefined) params.push({ key: 'sort', value: sort});
        if (filter !== undefined) params.push({ key: 'filter', value: filter});

        const response = await fetchUrl({path: '/bands', params, options: {
            method: 'GET',
        }});

        // TODO: Дописать обработку ошибок
        if (!response.ok) throw new Error('Network response was not ok');

        return await response.json();
    } catch (error) {
        console.error('Error getting bands:', error);
        throw error;
    }
}

async function getBandById(id: number): Promise<Band> {
    try {
        const response = await fetchUrl({path: `/bands/${id}`,  options: {
                method: 'GET',
            }});

        // TODO: Дописать обработку ошибок
        if (!response.ok) throw new Error('Network response was not ok');

        return await response.json();
    } catch (error) {
        console.error('Error getting bands:', error);
        throw error;
    }
}

async function deleteBandById(id: number): Promise<void> {
    try {
        const response = await fetchUrl({path: `/bands/${id}`,  options: {
                method: 'DELETE',
            }});

        // TODO: Дописать обработку ошибок
        if (!response.ok) throw new Error('Network response was not ok');
    } catch (error) {
        console.error('Error getting bands:', error);
        throw error;
    }
}

async function updateBandById(id: number, bandData: Partial<Band>): Promise<Band> {
    try {
        const response = await fetchUrl({path: `/bands/${id}`,  options: {
                method: 'PATCH',
                body: JSON.stringify(bandData),
                headers: { 'Content-Type': 'application/json' }
            }});

        // TODO: Дописать обработку ошибок
        if (!response.ok) throw new Error('Network response was not ok');

        return await response.json();
    } catch (error) {
        console.error('Error getting bands:', error);
        throw error;
    }
}

async function getAllGenres(): Promise<Genre[]> {
    try {
        const response = await fetchUrl({path: `/bands/genre`,  options: {
                method: 'GET',
            }});

        // TODO: Дописать обработку ошибок
        if (!response.ok) throw new Error('Network response was not ok');

        return await response.json();
    } catch (error) {
        console.error('Error getting bands:', error);
        throw error;
    }
}

async function deleteBandsByGenre(genre: Genre): Promise<void> {
    try {
        const response = await fetchUrl({path: `/bands/genre/${genre}`,  options: {
                method: 'DELETE',
            }});

        // TODO: Дописать обработку ошибок
        if (!response.ok) throw new Error('Network response was not ok');
    } catch (error) {
        console.error('Error getting bands:', error);
        throw error;
    }
}

async function getBandWithMinGenre(): Promise<Band> {
    try {
        const response = await fetchUrl({path: `/bands/genre/min`,  options: {
                method: 'GET',
            }});

        // TODO: Дописать обработку ошибок
        if (!response.ok) throw new Error('Network response was not ok');

        return await response.json();
    } catch (error) {
        console.error('Error getting bands:', error);
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
    deleteBandsByGenre,
    getBandWithMinGenre
};

