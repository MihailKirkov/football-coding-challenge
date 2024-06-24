import axios, { AxiosError } from 'axios';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!VITE_API_BASE_URL) {
    throw new Error('VITE_API_BASE_URL is not defined');
}

interface Club {
    id: string;
    name: string;
    country: string;
    value: number;
    image: string;
    european_titles?: number;
}

export const fetchClubsData = async (): Promise<Club[] | undefined> => {
    try {
        const url = `${VITE_API_BASE_URL}/hiring/clubs.json`;
        const res = await axios.get<Club[]>(url);
        return res.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

export const fetchClubById = async (id: string): Promise<Club | undefined> => {
    try {
        const clubs = await fetchClubsData();
        if (!clubs) {
            return undefined;
        }
        return clubs.find(club => club.id === id);
    } catch (error) {
        handleAxiosError(error);
    }
};

const handleAxiosError = (error: unknown): void => {
    if (error instanceof AxiosError) {
        console.error(`Error during fetch: ${error.response?.status}`);
    } else {
        console.error('Unknown error:', error);
    }
    throw error;
};
